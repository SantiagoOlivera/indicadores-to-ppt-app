import { useEffect, useState } from "react";
import {
  HeaderCell,
  DataCellText,
  DataCellNumber,
  DataCellBoolean,
  DataCell,
  DataCellTextArea,
} from "./Cell";
import { DataRow, HeaderRow, OperationHeaderRow } from "./Row";
import Table from "./Table";

interface IColumn {
  data: string;
  name: string;
  type: string;
  disabled?: boolean;
  editable?: boolean;
  hidden?: boolean;
  fixed?: boolean;
  decimals?: number;
  width?: number;
}

interface IActionDataTable {
  type: string;
  idx: number;
  prop?: string;
  oldValue?: any;
  newValue?: any;
  data: any;
}

function DataTable({
  id,
  title,
  columns,
  data,
  addRows,
  changeDataCallback,
}: //getDatatableDataCallback,
{
  id: string;
  title: string;
  columns: Array<IColumn>;
  data: Array<any>;
  addRows?: boolean;
  changeDataCallback?: (
    datarows: Array<any>,
    action?: IActionDataTable
  ) => void;
  //getDatatableDataCallback?: (data: Array<any>) => void;
}) {
  // Initialize rowsData with the data provided, adding an index to each item
  // This index will be used to track changes in the input fields
  // and ensure React can properly re-render the component when data changes
  const d: Array<any> = data.map((e: any) => {
    const i: number = data.indexOf(e);
    return { ...e, idx: i };
  });

  const [rowsdata, setRowsData] = useState<Array<any>>(d);
  const [lastaction, setLastAction] = useState<IActionDataTable | null>(null);

  const handleAddRowsData = () => {
    const i = rowsdata.length;
    const e: any = { idx: i };
    setRowsData((r: any) => [...r, e]);
    const action: IActionDataTable = {
      type: "add",
      data: e,
      idx: i,
    };
    setLastAction(action);
    //actionChangeData(action);
  };

  const handleChangeInput = (idx: number, prop: string, value: any) => {
    let oldValue: any = null;
    let e: any = null;
    setRowsData(
      rowsdata.map((item: any) => {
        if (item.idx === idx) {
          // Create a new object with the updated value
          // and return it, leaving the original object unchanged
          // This is important for React to detect changes
          // and re-render the component correctly
          oldValue = item[prop];
          e = { ...item, [prop]: value };
          return e;
        }
        return item; // Return the original item if no change is needed
      })
    );

    const action: IActionDataTable = {
      type: "change",
      idx: idx,
      prop: prop,
      oldValue: oldValue,
      newValue: value,
      data: e,
    };
    setLastAction(action);
  };

  const actionChangeData = (action: IActionDataTable) => {
    if (changeDataCallback) {
      changeDataCallback(rowsdata, action);
    } else {
      console.warn("No action callback provided");
    }
  };

  useEffect(() => {
    // This effect runs when the component mounts or when rowsdata changes
    // It can be used to perform side effects, such as logging or fetching data
    //console.log("Rows data updated:", rowsdata, lastaction);
    actionChangeData(lastaction as IActionDataTable);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsdata]);

  /* const handleGetDatatableDataCallback = () => {
    if (getDatatableDataCallback) {
      getDatatableDataCallback(rowsData);
    } 
  }; */

  return (
    <>
      {/* <button
        onClick={() => {
          handleGetDatatableDataCallback();
        }}
      >
        click me
      </button> */}
      <Table id={id} title={title}>
        <thead>
          <>
            {addRows ? (
              <OperationHeaderRow
                key={"operationHeaderRow"}
                colSpan={columns.length}
                handleAddRowsData={() => {
                  handleAddRowsData();
                }}
              ></OperationHeaderRow>
            ) : (
              ""
            )}
          </>
          <>
            <HeaderRow key={"headerRow"}>
              {columns.map((c) => {
                return (
                  <HeaderCell key={c.name} width={c.width} data={c.data}>
                    {c.name}
                  </HeaderCell>
                );
              })}
            </HeaderRow>
          </>
        </thead>
        <tbody>
          <>
            {rowsdata.map((e) => {
              return (
                <DataRow key={`${e.idx}-row`}>
                  <>
                    {columns.map((c) => {
                      if (c.type === "text") {
                        return (
                          <DataCellText
                            key={`${e.idx}-cell-${c.name}`}
                            editable={c.editable}
                            data={c.data}
                            width={c.width}
                            onChange={(event: any) =>
                              handleChangeInput(
                                e.idx,
                                c.data,
                                event.target?.value
                              )
                            }
                          >
                            {(e[c.data] ? e[c.data] : "") as string}
                          </DataCellText>
                        );
                      } else if (c.type === "number") {
                        return (
                          <DataCellNumber
                            key={`cell-${e.idx}-${c.name}`}
                            data={c.data}
                            editable={c.editable}
                            width={c.width}
                            decimals={c.decimals ? c.decimals : 0}
                            onChange={(event: any) =>
                              handleChangeInput(
                                e.idx,
                                c.data,
                                event.target?.value
                              )
                            }
                          >
                            {e[c.data] ? e[c.data] : ""}
                          </DataCellNumber>
                        );
                      } else if (c.type === "boolean") {
                        return (
                          <DataCellBoolean
                            key={`cell-${e.idx}-${c.name}`}
                            trueDescription="Sí"
                            falseDescription="No"
                            data={c.data}
                            editable={c.editable}
                            onChange={(event: any) => {
                              console.log(event.target.value);
                              handleChangeInput(e.idx, c.data, !e[c.data]);
                            }}
                          >
                            {e[c.data] ? e[c.data] : false}
                          </DataCellBoolean>
                        );
                      } else if (c.type === "textarea") {
                        return (
                          <DataCellTextArea
                            key={`${e.idx}-cell-${c.name}`}
                            editable={c.editable}
                            data={c.data}
                            width={c.width}
                            onChange={(event: any) =>
                              handleChangeInput(
                                e.idx,
                                c.data,
                                event.target?.value
                              )
                            }
                          >
                            {(e[c.data] ? e[c.data] : "") as string}
                          </DataCellTextArea>
                        );
                      } else {
                        return (
                          <DataCell
                            key={`cell-${e.idx}-${c.name}`}
                            data={c.data}
                          >
                            {e[c.data] ? e[c.data] : ""}
                          </DataCell>
                        );
                      }
                    })}
                  </>
                </DataRow>
              );
            })}
          </>
        </tbody>
        <tfoot></tfoot>
      </Table>
    </>
  );
}

export default DataTable;
