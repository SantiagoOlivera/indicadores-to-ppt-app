import React from "react";
import { InputNumber } from "../Inputs/Input";
import { Form } from "react-bootstrap";
import "./Cell.css";

interface ICellProps {
  name?: string;
  data: string;
  children?: React.ReactNode;
  editable?: boolean;
  onChange?: (event: any) => void;
  width?: number;
}

interface IHeaderCellProps extends ICellProps {
  children?: string;
}

interface IDataCellProps extends ICellProps {
  children: string;
}

interface IDataCellNumberProps extends ICellProps {
  children?: number | "" | undefined;
  decimals: number;
}

interface IDataCellBooleanProps extends ICellProps {
  children: boolean;
  trueDescription: string;
  falseDescription: string;
}

abstract class Cell extends React.Component<ICellProps> {
  constructor(props: ICellProps) {
    super(props);
  }
}

export class DataCell extends Cell {
  constructor(props: ICellProps) {
    super(props);
  }
  render() {
    return (
      <>
        <td>{this.props.children}</td>
      </>
    );
  }
}

/* export default function DataCellText({
  children,
  onChange,
}: {
  children: string;
  onChange: (e: any) => void;
}) {
  return (
    <>
      <td>
        <input
          type="text"
          className="form-control form-control-sm"
          value={children}
          onChange={onChange}
        />
      </td>
    </>
  );
} */

export class DataCellText extends DataCell {
  constructor(props: IDataCellProps) {
    super(props);
  }
  render() {
    return (
      <>
        <td>
          <>
            {this.props.editable ? (
              <input
                type="text"
                className="form-control form-control-sm"
                onChange={this.props.onChange}
                value={`${this.props.children}`}
              />
            ) : (
              this.props.children
            )}
          </>
        </td>
      </>
    );
  }
}

export class DataCellNumber extends DataCell {
  // Override the props type to include decimals
  declare props: IDataCellNumberProps;
  constructor(props: IDataCellNumberProps) {
    super(props);
  }
  render() {
    return (
      <>
        <td>
          <>
            {this.props.editable ? (
              <InputNumber
                value={this.props.children}
                decimals={this.props.decimals ? this.props.decimals : 0}
                onChange={this.props.onChange}
              ></InputNumber>
            ) : (
              this.props.children?.toString() || ""
            )}
          </>
        </td>
      </>
    );
  }
}

export class DataCellBoolean extends DataCell {
  declare props: IDataCellBooleanProps;
  constructor(props: IDataCellBooleanProps) {
    super(props);
  }
  render() {
    return (
      <>
        <td>
          <>
            {this.props.editable ? (
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                checked={this.props.children}
                onChange={this.props.onChange}
                className="mt-1"
              />
            ) : this.props.children ? (
              this.props.trueDescription || "Sí"
            ) : (
              this.props.falseDescription || "No"
            )}
          </>
        </td>
      </>
    );
  }
}

export class DataCellTextArea extends DataCell {
  constructor(props: IDataCellProps) {
    super(props);
  }
  render() {
    return (
      <>
        <td>
          <>
            {this.props.editable ? (
              <textarea
                className="form-control form-control-sm"
                onChange={this.props.onChange}
                value={this.props.children as string}
              ></textarea>
            ) : (
              this.props.children
            )}
          </>
        </td>
      </>
    );
  }
}

/* class DataCellNumber extends DataCell {
  constructor(props: ICellProps) {
    super(props);
  }
  render() {
    return (
      <>
        <td>
          <input type="text" className="form-control">
            {this.props.children}
          </input>
        </td>
      </>
    );
  }
} */

export class HeaderCell extends Cell {
  constructor(props: IHeaderCellProps) {
    super(props);
  }
  render() {
    return (
      <>
        <th>{this.props.children}</th>
      </>
    );
  }
}
/* function Cell({ index }: { index: number; children: React.ReactNode }) {
  return (
    <>
      <td id={`cell-${index}`}></td>
    </>
  );
}
 */
