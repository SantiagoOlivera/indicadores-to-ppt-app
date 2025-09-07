/* import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; */
import { useState } from "react";
import "./App.css";
import DataTable from "./components/Table/DataTable";
import { IndicadoresTemplate } from "./components/Template/IndicadoresTemplate/IndicadoresTemplate";
import "bootstrap/dist/css/bootstrap.min.css";
import Stepper from "./components/Stepper/Stepper";
import Step from "./components/Stepper/Step";
import indicadores from "../src/assets/indicadores/indicadores.json";

function App() {
  //const [count, setCount] = useState(0);

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
    /* {
      name: "C3",
      data: "text",
      type: "text",
      editable: true,
    },
    {
      name: "C4",
      data: "text",
      type: "text",
      editable: true,
    }, */
  ];

  const data = indicadores;

  const [trimestre, setTrimestre] = useState<number>(1);
  const [dataIndicadores, setDataIndicadores] = useState<Array<any>>([]);

  const handleChangeData = (data: any) => {
    //console.log("Get data", data);
    data[data.length - 1].numeroIndicador = data.length;
    setDataIndicadores(data);
  };

  return (
    <>
      {/* <div className="container">
        <div className="row">
          <div className="col-2" style={{ padding: "10px" }}>
            <select className="form-control" value={trimestre}>
              <option value={1} onClick={() => setTrimestre(1)}>
                Trimestre 1
              </option>
              <option value={2} onClick={() => setTrimestre(2)}>
                Trimestre 2
              </option>
              <option value={3} onClick={() => setTrimestre(3)}>
                Trimestre 3
              </option>
              <option value={4} onClick={() => setTrimestre(4)}>
                Trimestre 4
              </option>
            </select>
          </div>
          <div className="col-12">
            <DataTable
              id="test"
              title="Generar ppt de indicadores"
              columns={columns}
              data={data}
              addRows={true}
              changeDataCallback={(data: any) => {
                console.log("Change data", data);
                handleChangeData(data);
              }}
              //getDatatableDataCallback={handleChangeData}
            ></DataTable>
          </div>
        </div>
      </div>

      <div className="w-100">
        <IndicadoresTemplate
          data={{
            anio: new Date().getFullYear(),
            trimestre: trimestre,
            indicadores: dataIndicadores,
          }}
          id={"indicadores-template"}
        ></IndicadoresTemplate>
      </div> */}

      <Stepper
        activeStep={0}
        onStepClick={(stepIndex) => console.log("Clicked step:", stepIndex)}
        previousButtonText="Volver"
        nextButtonText="Preview .ppt"
        finishButtonText="Exportar .ppt"
      >
        <Step title="Cargar Indicadores">
          <div className="row">
            <div className="col-2" style={{ padding: "10px" }}>
              <select className="form-control" value={trimestre}>
                <option value={1} onClick={() => setTrimestre(1)}>
                  Trimestre 1
                </option>
                <option value={2} onClick={() => setTrimestre(2)}>
                  Trimestre 2
                </option>
                <option value={3} onClick={() => setTrimestre(3)}>
                  Trimestre 3
                </option>
                <option value={4} onClick={() => setTrimestre(4)}>
                  Trimestre 4
                </option>
              </select>
            </div>
            <div className="col-12">
              <DataTable
                id="test"
                title=""
                columns={columns}
                data={data}
                addRows={true}
                changeDataCallback={(data: any) => {
                  console.log("Change data", data);
                  handleChangeData(data);
                }}
                //getDatatableDataCallback={handleChangeData}
              ></DataTable>
            </div>
          </div>
        </Step>
        <Step title="Preview y Exportar a .ppt">
          <div className="w-100" style={{ overflow: "auto" }}>
            <IndicadoresTemplate
              data={{
                anio: new Date().getFullYear(),
                trimestre: trimestre,
                indicadores: dataIndicadores,
              }}
              id={"indicadores-template"}
            ></IndicadoresTemplate>
          </div>
        </Step>
      </Stepper>

      {/* <Table id="test-table" title="Hi World!">
        <HeaderRow>
          <HeaderCe
          ll>C1</HeaderCell>
          <HeaderCell>C2</HeaderCell>
        </HeaderRow>
        <DataRow>
          <DataCell>A</DataCell>
          <DataCell>B</DataCell>
        </DataRow>
        <DataRow>
          <DataCell>A</DataCell>
          <DataCell>B</DataCell>
        </DataRow>
      </Table> */}
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
