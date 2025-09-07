import PptxGenJS from "pptxgenjs";
import React from "react";
import { Functions } from "../Functions/Functions";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";

export interface ITemplateProps {
  id: string;
}

export abstract class Template extends React.Component<ITemplateProps> {
  declare props: ITemplateProps;
  public static WIDTH_PAGE: number = 1920;
  public static HEIGHT_PAGE: number = 1080;
  public static DPI_BY_INCH: number = 96;
  public static FONT_SIZE_PX_TO_PT: number = 0.75;
  constructor(props: ITemplateProps) {
    super(props);
  }

  public exportToPptx(): void {
    const pptx = new PptxGenJS();
    pptx.defineLayout({
      name: "MyCustomLayout",
      width: 20,
      height: 11.25,
    });
    pptx.layout = "MyCustomLayout";
    // Implement export logic here
    console.log("Exporting to PPTX...");
    const e = document.getElementById(this.props.id);
    const pages = e?.getElementsByClassName("ppt-page");
    console.log(e, pages);
    if (!pages) {
      console.error("No pages found to export.");
    } else if (pages?.length === 0) {
      console.error("No pages found to export.");
      return;
    } else {
      for (let i = 0; i < pages?.length; i++) {
        // 2. Add a Slide
        console.log("Page:" + i, pages.length);
        const template = document.getElementById(this.props.id);
        if (!template) {
          throw new Error(
            `Template element with id '${this.props.id}' not found.`
          );
        }
        const rows = pages[i].querySelectorAll(":scope > .row");
        const printables = pages[i].getElementsByClassName("printable");
        console.log("Rows in page", rows, rows.length);
        console.log("Printables", printables, printables.length);

        const slide = pptx.addSlide();
        for (let j = 0; j < printables.length; j++) {
          /* console.log(
            "Print: ",
            pritables[j].clientWidth,
            pritables[j].clientHeight,
            pritables[j].getBoundingClientRect(),
            template?.clientWidth,
            template?.clientHeight,
            template?.getBoundingClientRect()
          ); */

          const stylesPrintable: CSSStyleDeclaration = window.getComputedStyle(
            printables[j]
          );
          console.log(
            printables[j].getBoundingClientRect(),
            stylesPrintable,
            printables[j].tagName
          );

          if (printables[j].tagName.toUpperCase().startsWith("H")) {
            console.log(
              printables[j].innerHTML.toString(),
              Functions.rgbRgbaToHex(stylesPrintable.color)
            );

            slide.addText(printables[j].innerHTML.toString(), {
              shape: pptx.ShapeType.rect,
              x: this.getPositionLeftPx(printables[j]) / Template.DPI_BY_INCH,
              y:
                this.getPositionTopPx(printables[j], pages[i]) /
                Template.DPI_BY_INCH,
              w:
                printables[j].getBoundingClientRect().width /
                Template.DPI_BY_INCH,
              h:
                printables[j].getBoundingClientRect().height /
                Template.DPI_BY_INCH,
              fill: {
                color: Functions.rgbRgbaToHex(stylesPrintable.backgroundColor),
              },
              align: "center",
              fontSize: Number(
                (
                  Number(
                    stylesPrintable.fontSize.toString().replace("px", "")
                  ) * Template.FONT_SIZE_PX_TO_PT
                ).toFixed(0)
              ),
              bold: Functions.isFontWeight(stylesPrintable),
              color: Functions.rgbRgbaToHex(stylesPrintable.color),
              line: {
                color: Functions.rgbRgbaToHex(stylesPrintable.borderColor),
                width: Number(
                  stylesPrintable.borderWidth.toString().replace("px", "")
                ),
              },
            });
          } else if (printables[j].tagName.toUpperCase() === "TABLE") {
            const rows: Array<any> = [];
            const table = printables[j] as HTMLTableElement;
            const colW: number[] = [];
            const rowH: number[] = [];

            for (let c = 0; c < table.rows[0].cells.length; c++) {
              colW.push(
                Number(
                  table.rows[0].cells[c].getBoundingClientRect().width /
                    Template.DPI_BY_INCH
                )
              );
            }

            for (const r of table.rows) {
              const a: any = [];
              const stylesRow: CSSStyleDeclaration = window.getComputedStyle(r);
              rowH.push(
                r.getBoundingClientRect().height / Template.DPI_BY_INCH
              );
              console.log(
                r,
                "Row height",
                r.getBoundingClientRect().height / Template.DPI_BY_INCH
              );
              for (const c of r.cells) {
                const stylesCell: CSSStyleDeclaration =
                  window.getComputedStyle(c);
                const textNode: string = Functions.getTextOnlyChildNodes(c)
                  .map((n) =>
                    n.textContent ? n.textContent.replace(/\n/g, "").trim() : ""
                  )
                  .join(" ");

                a.push({
                  text: textNode,
                  options: {
                    bold: Functions.isFontWeight(stylesCell),
                    align: stylesCell.textAlign,
                    valign:
                      stylesCell.verticalAlign === "middle"
                        ? "middle"
                        : stylesCell.verticalAlign === "top"
                        ? "top"
                        : stylesCell.verticalAlign === "bottom"
                        ? "bottom"
                        : "middle",
                    fill: Functions.rgbRgbaToHex(stylesRow.backgroundColor),
                    color: Functions.rgbRgbaToHex(stylesCell.color),
                    pt: Number(
                      (
                        Number(stylesCell.width.replace("px", "")) *
                        Template.DPI_BY_INCH
                      ).toFixed(0)
                    ),
                  },
                });
              }
              rows.push(a);
            }

            slide.addTable(rows, {
              x: this.getPositionLeftPx(printables[j]) / Template.DPI_BY_INCH,
              y:
                this.getPositionTopPx(printables[j], pages[i]) /
                Template.DPI_BY_INCH,
              w:
                printables[j].getBoundingClientRect().width /
                Template.DPI_BY_INCH,
              h:
                printables[j].getBoundingClientRect().height /
                Template.DPI_BY_INCH,
              border: {
                color: stylesPrintable.borderColor,
                pt: Number(
                  Number(
                    stylesPrintable.borderWidth.toString().replace("px", "")
                  ).toFixed(0)
                ),
              },
              bold: Functions.isFontWeight(stylesPrintable),
              fontSize:
                Number(
                  Number(
                    stylesPrintable.fontSize.toString().replace("px", "")
                  ).toFixed(0)
                ) * Template.FONT_SIZE_PX_TO_PT,
              colW: colW,
              rowH: rowH,
            });
          } else if (printables[j].tagName.toUpperCase() === "IMG") {
            const src: string | undefined =
              printables[j].getAttribute("src") ?? undefined;

            if (src) {
              if (src.startsWith("data:image/svg+xml,")) {
                slide.addImage({
                  data: this.svgToBase64(printables[j] as HTMLImageElement),
                  x:
                    this.getPositionLeftPx(printables[j]) /
                    Template.DPI_BY_INCH,
                  y:
                    this.getPositionTopPx(printables[j], pages[i]) /
                    Template.DPI_BY_INCH,
                  w:
                    printables[j].getBoundingClientRect().width /
                    Template.DPI_BY_INCH,
                  h:
                    printables[j].getBoundingClientRect().height /
                    Template.DPI_BY_INCH,
                });
              } else {
                slide.addImage({
                  path: src,
                  x:
                    this.getPositionLeftPx(printables[j]) /
                    Template.DPI_BY_INCH,
                  y:
                    this.getPositionTopPx(printables[j], pages[i]) /
                    Template.DPI_BY_INCH,
                  w:
                    printables[j].getBoundingClientRect().width /
                    Template.DPI_BY_INCH,
                  h:
                    printables[j].getBoundingClientRect().height /
                    Template.DPI_BY_INCH,
                });
              }
            }
          } else if (printables[j].tagName.toUpperCase() === "DIV") {
            slide.addText(printables[j].innerHTML.toString(), {
              shape: pptx.ShapeType.rect,
              x: this.getPositionLeftPx(printables[j]) / Template.DPI_BY_INCH,
              y:
                this.getPositionTopPx(printables[j], pages[i]) /
                Template.DPI_BY_INCH,
              w:
                printables[j].getBoundingClientRect().width /
                Template.DPI_BY_INCH,
              h:
                printables[j].getBoundingClientRect().height /
                Template.DPI_BY_INCH,
              fill: {
                color: Functions.rgbRgbaToHex(stylesPrintable.backgroundColor),
              },
              align:
                stylesPrintable.textAlign === "center"
                  ? "center"
                  : stylesPrintable.textAlign === "left"
                  ? "left"
                  : stylesPrintable.textAlign === "right"
                  ? "right"
                  : "left",
              valign:
                stylesPrintable.verticalAlign === "center" ? "middle" : "top",
              fontSize: Number(
                Number(
                  stylesPrintable.fontSize.toString().replace("px", "")
                ).toFixed(0)
              ),
              bold: Functions.isFontWeight(stylesPrintable),
              color: Functions.rgbRgbaToHex(stylesPrintable.color),
              line: {
                color: Functions.rgbRgbaToHex(stylesPrintable.borderColor),
                width: Number(
                  Number(
                    stylesPrintable.borderWidth.toString().replace("px", "")
                  ).toFixed(0)
                ),
              },
            });
          }
        }
      }
    }
    pptx.writeFile({ fileName: "Test.pptx" });
  }

  private svgToBase64(svgElement: HTMLImageElement) {
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const base64 = `image/png;base64,${btoa(svgString)}`;
    return base64;
  }

  private getPositionLeftPx(e: Element): number {
    const template = document.getElementById(this.props.id);
    if (!template) {
      throw new Error(`Template element with id '${this.props.id}' not found.`);
    }
    return (
      e.getBoundingClientRect().left - template.getBoundingClientRect().left
    );
  }

  private getPositionTopPx(e: Element, page: Element): number {
    if (!page) {
      throw new Error(`Template element with id '${page}' not found.`);
    }
    return e.getBoundingClientRect().top - page.getBoundingClientRect().top;
  }

  public renderDefaultHeader(): React.ReactNode {
    return (
      <>
        <div
          className="w-100"
          style={{
            minHeight: "70px",
            /* position: "fixed",
            zIndex: 1000, */
          }}
        >
          <br />
          <Button
            type="button"
            className="btn btn-success"
            onClick={() => {
              this.exportToPptx();
            }}
          >
            <Download /> &nbsp; Exportar a ppt
          </Button>
        </div>
        <br />
        <br />
      </>
    );
  }
}
