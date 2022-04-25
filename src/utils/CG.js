// class name generator
export function CG (block, elem, modifiers = []) {
  let className = ''
  if (block) {
    className += block
  }

  if (elem) {
      className+= ` ${block}__${elem}`
  }

  if (modifiers.length) {
     modifiers.forEach(modifier => {
         if (elem) {
             className += ` ${block}__${elem}--${modifier}`
         }
         else {
             className += ` ${block}--${modifier}`
         }
     });
  }

  return className
}


// class name generator for templates
 export function TCG (options, blockName) {
    let { block = blockName, elem, modifiers } = options.hash
    return CG(block, elem, modifiers ? modifiers.split(' ') : [])
  }


