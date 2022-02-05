const fs = require('fs')
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const template = require('@babel/template').default;
const t = require('@babel/types')
const { promisify } = require('util')


const writeFile = promisify(fs.writeFile);


const getFunctions = memo => ({ Function(p) { 
  if (!p.node.id) return memo.push({ name: '_' });

  memo.push({name: p.node.id.name, implementation: p.node })
  }
});

const ghostOrchestrateTemplate =  template(`const  %%mainImplementationIdentifier%% = (...args) => {
  const determine = global.determineGhost(%%ghostName%%);

  %%mainImplementation%%

  %%ghostImplementation%%

  return ({
    main: %%mainImplementationIdentifier%%,
    [%%ghostName%%]: %%ghostImplementationIdentifier%%
  })[determine](...args)
}`)

const ghostwrite = (source, object) => {

   
    const ghostAst = parser.parse(source);
    const objectAst = parser.parse(object);

    const ghostFunctions = [];
    traverse(ghostAst, getFunctions(ghostFunctions));

    const memo = {}

    traverse(objectAst, {
      Function(p) {

        if (!p.node.loc) return;
        if (!p.node.id) return;

        const ghost = ghostFunctions.find(fn => fn.name === p.node.id.name);

        if (!ghost) return;
        if (memo[p.node.id.name]) return 

        memo[p.node.id.name] = true;
        

        p.replaceWith(ghostOrchestrateTemplate({
          mainImplementation: p.node,
          mainImplementationIdentifier: t.identifier(p.node.id.name),
          ghostName: t.stringLiteral('__ghost__' + p.node.id.name),
          ghostImplementation: t.functionDeclaration(
            t.identifier('__ghost__' + p.node.id.name),
            ghost.implementation.params,
            ghost.implementation.body
          ),
          ghostImplementationIdentifier: t.identifier('__ghost__' + p.node.id.name)
        }))
      }
    })


    return generator(objectAst).code
}

module.exports = ghostwrite