import { Template, type ITemplateProps } from "../Template";
import mymtecIsoLogo from "./images/mymtec-iso-logo.jpg";
import smileFace from "./images/smile-face.png";
import badFace from "./images/bad-face.png";
import "./IndicadoresTemplate.css";

type IndicadoresDataProps = {
  anio: number;
  trimestre: number;
  indicadores: Array<IndicadorRow>;
};

type IndicadorRow = {
  numeroIndicador: number | string;
  descripcion: string;
  seCumplioLaMeta: boolean;
  detalle: string;
  comentarios: string;
  anterior1: boolean;
  anterior2: boolean;
  anterior3: boolean;
  meta: string;
  responsable: string;
  resultado: string;
};

interface IIndicadoresTemplateProps extends ITemplateProps {
  data: IndicadoresDataProps;
}

export class IndicadoresTemplate extends Template {
  declare props: IIndicadoresTemplateProps;
  constructor(props: IIndicadoresTemplateProps) {
    super(props);
  }

  public render() {
    return (
      <>
        {/* <div
          className="container"
          style={{
            minWidth: Template.WIDTH_PAGE,
            maxWidth: Template.WIDTH_PAGE,
          }}
        >
          {this.renderDefaultHeader()}
        </div> */}

        {/* <div
          className="container"
          style={{
            minWidth: Template.WIDTH_PAGE,
            maxWidth: Template.WIDTH_PAGE,
          }}
        >
          <div
            className="ppt-page shadow-lg"
            style={{
              minHeight: Template.HEIGHT_PAGE,
              maxHeight: Template.HEIGHT_PAGE,
            }}
          ></div>
        </div> */}
        <div
          className="container"
          style={{
            minWidth: Template.WIDTH_PAGE,
            maxWidth: Template.WIDTH_PAGE,
          }}
        >
          <div id={this.props.id} className="row">
            {this.props.data.indicadores.map((e, index) => (
              <div
                key={index}
                className="ppt-page border"
                style={{
                  minHeight: Template.HEIGHT_PAGE,
                  maxHeight: Template.HEIGHT_PAGE,
                }}
              >
                <div className="col-12">
                  <div className="row">
                    <div className="col-9 bg-white">
                      <div className="row">
                        <div className="col-9 text-white p-0">
                          <h1
                            className=" header-color printable m-0"
                            style={{
                              fontSize: Template.FONT_SIZE_PX_TO_PT * 75 + "px",
                              width: 8 * Template.DPI_BY_INCH + "px",
                              height: 1.3 * Template.DPI_BY_INCH + "px",
                              padding: 0.25 * Template.DPI_BY_INCH + "px",
                              textAlign: "center",
                              fontWeight: "bold",
                            }}
                          >
                            Indicador {e.numeroIndicador} |{" "}
                            {this.props.data.anio} | T
                            {this.props.data.trimestre}
                          </h1>
                        </div>
                        <div className="col-3 bg-white"></div>
                      </div>
                    </div>
                    <div className="col-3">
                      <img
                        src={mymtecIsoLogo}
                        alt="Mymtec ISO Logo"
                        className="w-100 printable"
                        style={{
                          height: 1.7 * Template.DPI_BY_INCH + "px",
                        }}
                      ></img>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 bg-white"
                  style={{ height: "5px" }}
                ></div>
                <div className="col-12">
                  <div className="row">
                    <div className="col-3">
                      <h4 className="text-center">
                        <img
                          src={e.seCumplioLaMeta ? smileFace : badFace}
                          alt="Imagen - Indica si se cumplió la meta del indicador"
                          className="printable"
                          style={{
                            height: 4 * Template.DPI_BY_INCH + "px",
                            width: "70%",
                          }}
                        ></img>
                      </h4>
                    </div>
                    <div className="col-9">
                      <table
                        className="table-indicadores printable"
                        style={{
                          width: "100%",
                          position: "relative",
                          minHeight: "464px",
                        }}
                      >
                        <tbody>
                          <tr className="row-odd">
                            <td
                              className="text-start"
                              style={{ width: "100px", fontWeight: "bold" }}
                            >
                              Indicador {e.numeroIndicador}
                            </td>
                            <td
                              className="text-start"
                              style={{ fontWeight: "bold" }}
                            >
                              {e.descripcion}
                            </td>
                          </tr>
                          <tr className="row-even">
                            <td
                              className="text-start"
                              style={{
                                width: "100px",
                              }}
                            >
                              Detalle
                            </td>
                            <td className="text-start">{e.detalle}</td>
                          </tr>
                          <tr className="row-odd">
                            <td className="text-start">Meta</td>
                            <td className="text-start">{e.meta}</td>
                          </tr>
                          <tr className="row-even">
                            <td className="text-start">Responsable</td>
                            <td className="text-start">{e.responsable}</td>
                          </tr>
                          <tr className="row-odd">
                            <td className="text-start">Resultado</td>
                            <td className="text-start">{e.resultado}</td>
                          </tr>
                          <tr className="row-even">
                            <td
                              className="text-start"
                              style={{ width: "200px" }}
                            >
                              3 Anteriores
                            </td>
                            <td
                              className="text-start"
                              style={{ paddingLeft: "10px", height: "100px" }}
                            >
                              <img
                                src={e.anterior1 ? smileFace : badFace}
                                alt="Imagen - Indica si se cumplió la meta del indicador anterior 1"
                                className="printable"
                                style={{
                                  width: "65px",
                                  height: "65px",
                                  marginRight: "10px",
                                }}
                              ></img>
                              <img
                                src={e.anterior2 ? smileFace : badFace}
                                alt="Imagen - Indica si se cumplió la meta del indicador anterior 2"
                                className="printable"
                                style={{
                                  width: "65px",
                                  height: "65px",
                                  marginRight: "10px",
                                }}
                              ></img>
                              <img
                                src={e.anterior3 ? smileFace : badFace}
                                alt="Imagen - Indica si se cumplió la meta del indicador anterior 3"
                                className="printable"
                                style={{
                                  width: "65px",
                                  height: "65px",
                                  marginRight: "10px",
                                }}
                              ></img>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="col-12"
                  style={{
                    position: "relative",
                    top: "-65px",
                  }}
                >
                  <div className="row m-3 " id="footerComentarios">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-3"></div>
                        <div className="col-9"></div>
                      </div>
                      <div className="row">
                        <h3
                          className="col-2 text-center printable border-comments-footer header-color text-white p-1 font-weight-bold text-center "
                          style={{
                            fontSize: Template.FONT_SIZE_PX_TO_PT * 50 + "px",
                            fontWeight: "bold",
                            marginBottom: 0,
                          }}
                        >
                          Comentarios
                        </h3>
                        <div className="col-10"></div>
                        <div
                          className="col-12 border-comments-footer p-1 printable"
                          style={{
                            height: 4.4 * Template.DPI_BY_INCH + "px",
                            backgroundColor: "#FFFFFF",
                          }}
                        >
                          {e.comentarios}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}
