/**
 * CG - class name generator
 * Позволяет создавать классы по БЭМ
 * Примеры:
 * CG("block", "elem", ["modifier1", "modifier2"]) =>
 * "block__elem--modifier1 block__elem--modifier2"
 * CG("block", "", ["modifier1", "modifier2"]) => "block--modifier1 block--modifier2"
 * CG("block", "elem", []) => "block__elem"
 * */
export function CG(block: string, elem?: string, modifiers: string[] = []): string {
  let className = '';

  className += block;

  if (elem) {
    className += `__${elem}`;
  }

  if (modifiers.length) {
    modifiers.forEach((modifier) => {
      if (elem) {
        className += ` ${block}__${elem}--${modifier}`;
      } else {
        className += ` ${block}--${modifier}`;
      }
    });
  }

  return className.replace(/\s+/, ' ');
}

/**
 * Модифицированный хэлпер, упрощающий использование CG для шаблонов
 * */
export function TCG(
  { hash }: { hash: { block: string; elem: string; modifiers: string; className?: string } },
  blockName: string
): string {
  const { block = blockName, elem, modifiers, className } = hash;

  return CG(block, elem, modifiers ? modifiers.split(' ') : []) + `${className ? ' ' + className : ''}`;
}
