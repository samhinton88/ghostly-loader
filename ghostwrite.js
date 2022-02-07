const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const template = require("@babel/template").default;
const t = require("@babel/types");
const { promisify } = require("util");


const getFunctions = (memo, comments) => ({
  Function(p) {

    if (!p.node.id) return memo.push({ name: "_" });
    const ghostName = p.node.id.name;
    const comment = comments.find((c) => c.loc.end.line === (p.node.loc.start.line - 1))
    console.log({ comment })
    const tag = ghostName.split("$")[1];

    memo.push({
      name: tag ? ghostName : ghostName + '$',
      implementation: p.node,
      loc: p.node.loc,
      tag: tag,
      comment
    });
  },
});

const ghostOrchestrateTemplate = ({ ghosts, ...rest }) => {
  const args = {
    ...rest,
    ...ghosts.reduce((acc, { name, tag, implementation }) => {
      if (!tag) {
        implementation.id.name += '$'
      }
      return {
        ...acc,
        [`${name}`]: implementation,
        [`${name}_identifier`]: t.identifier(`${name}`),

        [`${name}_name`]: t.stringLiteral(`${name}`),
      };
    }, {}),
  };

  const orchestrationTemplateString = `const  %%mainImplementationIdentifier%% = (...args) => {
  const determine = global.determineGhost(%%ghostName%%, {

    ${ghosts.map((ghost) => `${ghost.name}: ${ghost.comment ? ghost.comment.value : 'undefined'},`).join('\n')}
  });
  
    %%mainImplementation%%
  
    ${ghosts.map(({ tag, name }) => `%%${name}%%`).join("\n  ")}
  
    return ({
      main: %%mainImplementationIdentifier%%,
      ${ghosts
        .map(
          ({ tag, name }) =>
            `[%%${name}_name%%]: %%${name}_identifier%%`
        )
        .join(",\n")}
    })[determine](...args)
  }`;

  console.log(orchestrationTemplateString)
  console.log(Object.keys(args))

  return template(orchestrationTemplateString)(args);
};

const ghostwrite = (source, object) => {
  const ghostAst = parser.parse(source);
  const objectAst = parser.parse(object);



  const ghostFunctions = [];

  traverse(ghostAst, getFunctions(ghostFunctions, ghostAst.comments));

  const memo = {};

  traverse(objectAst, {
    Function(p) {
      if (!p.node.loc) return;
      if (!p.node.id) return;

      const sourceFunctionName = p.node.id.name;

      const ghosts = ghostFunctions.filter((fn) =>
        fn.name.startsWith(sourceFunctionName)
      );

      if (ghosts.length === 0) return;
      if (memo[sourceFunctionName]) return;

      ghosts.forEach(({ name }) => { memo[name] = true});
      console.log(ghosts.map(({ name }) => name))

      memo[sourceFunctionName] = true;

      p.replaceWith(
        ghostOrchestrateTemplate({
          ghosts,
          mainImplementation: p.node,
          mainImplementationIdentifier: t.identifier(sourceFunctionName),
          ghostName: t.stringLiteral(sourceFunctionName),
        })
      );
    },
  });

  return generator(objectAst).code;
};

module.exports = ghostwrite;
