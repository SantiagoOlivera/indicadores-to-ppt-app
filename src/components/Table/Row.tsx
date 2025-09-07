import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
/* function Row({
  index,
  children,
}: {
  index: string;
  children: React.ReactElement<typeof Cell>;
}) {
  return (
    <>
      <tr id={`row-${index}`}>{children}</tr>
    </>
  );
} */

interface IRowProps {
  children?: React.ReactElement<typeof Row> | React.ReactElement<typeof Row>[];
  colSpan?: number;
  handleAddRowsData?: (e: any) => void;
}

interface IHeaderRowProps extends IRowProps {
  children?: React.ReactElement<typeof Row> | React.ReactElement<typeof Row>[];
}

interface IOperationHeaderRowProps extends IRowProps {
  colSpan: number;
  handleAddRowsData: () => void;
}

interface IDataRowProps extends IRowProps {
  children?: React.ReactElement<typeof Row> | React.ReactElement<typeof Row>[];
}

export abstract class Row extends React.Component<IRowProps> {
  constructor(props: IRowProps) {
    super(props);
  }
  public render() {
    return (
      <>
        <tr></tr>
      </>
    );
  }
}

export class HeaderRow extends Row {
  constructor(props: IHeaderRowProps) {
    super(props);
  }
  public render() {
    return (
      <>
        <tr>{this.props.children}</tr>
      </>
    );
  }
}

export class OperationHeaderRow extends Row {
  constructor(props: IOperationHeaderRowProps) {
    super(props);
  }
  public render() {
    return (
      <>
        <tr>
          <th colSpan={this.props.colSpan}>
            <ButtonGroup>
              <Button
                type="button"
                variant="success"
                onClick={this.props.handleAddRowsData}
              >
                <Icon.Plus size={25} />
                Agregar
              </Button>
            </ButtonGroup>
          </th>
        </tr>
      </>
    );
  }
}

export class DataRow extends Row {
  constructor(props: IDataRowProps) {
    super(props);
  }
  public render() {
    return (
      <>
        <tr>{this.props.children}</tr>
      </>
    );
  }
}
