import { useRef, useState } from "react";
import "./App.css";
import DataTable from "./components/Table/DataTable";
import { IndicadoresTemplate } from "./components/Template/IndicadoresTemplate/IndicadoresTemplate";
import "bootstrap/dist/css/bootstrap.min.css";
import Stepper from "./components/Stepper/Stepper";
import Step from "./components/Stepper/Step";
import indicadores from "../src/assets/indicadores/indicadores.json";

function App() {
  const columns = [
    {
      name: "N° Indicador",
      data: "numeroIndicador",
      type: "number",
      editable: false,
      width: 25,
    },
    {
      name: "Descripción",
      data: "descripcion",
      type: "text",
      editable: true,
    },
    {
      name: "Detalle",
      data: "detalle",
      type: "text",
      editable: true,
    },
    {
      name: "Meta",
      data: "meta",
      type: "text",
      editable: true,
    },
    {
      name: "Reposable",
      data: "responsable",
      type: "text",
      editable: true,
    },
    {
      name: "Se cumplió la meta?",
      data: "seCumplioLaMeta",
      type: "boolean",
      editable: true,
    },
    {
      name: "Resultado",
      data: "resultado",
      type: "text",
      editable: true,
    },
    {
      name: "Comentarios",
      data: "comentarios",
      type: "textarea",
      editable: true,
    },
    {
      name: "Anterior 1",
      data: "anterior1",
      type: "boolean",
      editable: true,
    },
    {
      name: "Anterior 2",
      data: "anterior2",
      type: "boolean",
      editable: true,
    },
    {
      name: "Anterior 3",
      data: "anterior3",
      type: "boolean",
      editable: true,
    },
  ];

  const data = indicadores;

  const [trimestre, setTrimestre] = useState<number>(1);
  const indicadoresRefs = useRef<any>(null);
  const [nombreArchivo, setNombreArchivo] = useState<string>(
    `Indicadores ${new Date().getFullYear()} - Trimestre ${trimestre}`
  );
  const [dataIndicadores, setDataIndicadores] = useState<Array<any>>([]);

  const handleChangeData = (data: any) => {
    //console.log("Get data", data);
    data[data.length - 1].numeroIndicador = data.length;
    setDataIndicadores(data);
  };

  const handleChangeNombreArchivo = (nombreArchivo: string) => {
    setNombreArchivo(nombreArchivo);
  };

  const ID_STEP_PREVIEW_Y_EXPORTAR_A_PPT = "previewYExportarAPpt";

  const handleClickNextStep = (step: number, idStep: string) => {
    console.log("Next step clicked ", step);
    if (idStep === ID_STEP_PREVIEW_Y_EXPORTAR_A_PPT) {
      indicadoresRefs.current.downloadFile();
    }
  };

  return (
    <>
      <Stepper
        currentStep={0}
        onStepClick={(stepIndex) => console.log("Clicked step:", stepIndex)}
        previousButtonText="Volver"
        nextButtonText="Preview .ppt"
        finishButtonText="Exportar a .ppt"
        onClickNextStep={handleClickNextStep}
        maxWidth={2100}
      >
        <Step id="cargarDeIndicadores" title="Cargar de indicadores">
          <div className="row">
            <div className="col-2">
              <select
                className="form-control"
                value={trimestre}
                onChange={(e) => setTrimestre(Number(e.target.value))}
              >
                <option
                  value={1}
                  onClick={() => {
                    setTrimestre(1);
                    handleChangeNombreArchivo(
                      `Indicadores ${new Date().getFullYear()} - Trimestre 1`
                    );
                  }}
                >
                  Trimestre 1
                </option>
                <option
                  value={2}
                  onClick={() => {
                    setTrimestre(2);
                    handleChangeNombreArchivo(
                      `Indicadores ${new Date().getFullYear()} - Trimestre 2`
                    );
                  }}
                >
                  Trimestre 2
                </option>
                <option
                  value={3}
                  onClick={() => {
                    setTrimestre(3);
                    handleChangeNombreArchivo(
                      `Indicadores ${new Date().getFullYear()} - Trimestre 3`
                    );
                  }}
                >
                  Trimestre 3
                </option>
                <option
                  value={4}
                  onClick={() => {
                    setTrimestre(4);
                    handleChangeNombreArchivo(
                      `Indicadores ${new Date().getFullYear()} - Trimestre 4`
                    );
                  }}
                >
                  Trimestre 4
                </option>
              </select>
            </div>
            <div className="col-2">
              <input
                type="text"
                className="form-control"
                value={nombreArchivo}
                onChange={(e) => {
                  handleChangeNombreArchivo(e.target.value);
                }}
                disabled={true}
              />
            </div>
            <div className="col-12">
              <DataTable
                id="test"
                title=""
                columns={columns}
                data={data}
                addRows={true}
                changeDataCallback={(data: any) => {
                  //console.log("Change data", data);
                  handleChangeData(data);
                }}
              ></DataTable>
            </div>
          </div>
        </Step>
        <Step
          id={ID_STEP_PREVIEW_Y_EXPORTAR_A_PPT}
          title="Preview y Exportar a .ppt"
        >
          <div className="w-100" style={{ overflow: "auto" }}>
            <IndicadoresTemplate
              ref={indicadoresRefs}
              data={{
                anio: new Date().getFullYear(),
                trimestre: trimestre,
                indicadores: dataIndicadores,
              }}
              id={"indicadores-template"}
              nombreArchivo={nombreArchivo}
            ></IndicadoresTemplate>
          </div>
        </Step>
      </Stepper>
    </>
  );
}

export default App;
