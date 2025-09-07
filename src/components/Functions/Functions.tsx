export class Functions {
  public static rgbRgbaToHex(rgbaString: string): string {
    let ret: string = "#";
    let split: Array<string> = [];

    const toHex = (c: number) => {
      const hex = c.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    if (rgbaString.includes("rgba")) {
      rgbaString.replace("rgba", "").split(",");
      if (split.length === 4) {
        for (const s of split) {
          console.log(s, Number(s.replace("(", "").replace(")", "")));
          const n: number = Number(s.replace("(", "").replace(")", ""));
          ret += toHex(n);
        }
      }
    } else if (rgbaString.includes("rgb")) {
      split = rgbaString.replace("rgb", "").split(",");
      if (split.length === 3) {
        for (const s of split) {
          console.log(s, Number(s.replace("(", "").replace(")", "")));
          const n: number = Number(s.replace("(", "").replace(")", ""));
          ret += toHex(n);
        }
      }
    }

    return ret.toUpperCase();
  }

  public static isFontWeight(
    ccsStyleDeclaration: CSSStyleDeclaration
  ): boolean {
    return (
      ccsStyleDeclaration.fontWeight === "bold" ||
      parseInt(ccsStyleDeclaration.fontWeight) >= 700
    );
  }

  /* public static areAllChildrenContentText(node: HTMLElement): boolean {
    let ret: boolean = false;
    for (let i = 0; i < node.children.length; i++) {
      // will output only non text nodes.
      if (node.children[i].nodeType !== Node.TEXT_NODE) {
        ret = true;
        break;
      }
    }
    return ret;
  } */

  public static getTextOnlyChildNodes(element: Element): Node[] {
    const textNodes = [];
    for (let i = 0; i < element.childNodes.length; i++) {
      const node = element.childNodes[i];
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      }
    }
    return textNodes;
  }
}
