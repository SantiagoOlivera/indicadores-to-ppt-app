import React from "react";
import { NumericFormat } from "react-number-format";

interface IInputProps {
  name?: string;
  value?: any;
  decimals?: number | 0;
}

interface IInputNumberProps extends IInputProps {
  value?: number | "";
  decimals: number;
  onChange?: (event: any) => void;
}

export abstract class Input extends React.Component<IInputProps> {
  constructor(props: IInputProps) {
    super(props);
  }
}

export class InputText extends Input {
  constructor(props: IInputProps) {
    super(props);
  }
  public render() {
    return (
      <>
        <input
          type={"text"}
          name={this.props.name}
          className="form-control form-control-sm"
        />
      </>
    );
  }
}

export class InputNumber extends Input {
  declare props: IInputNumberProps;
  constructor(props: IInputNumberProps) {
    super(props);
  }
  public render() {
    return (
      <>
        <NumericFormat
          className="form-control form-control-sm"
          value={this.props.value ? this.props.value : ""}
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={this.props.decimals}
          onValueChange={(event: any) => {
            if (this.props.onChange) {
              this.props.onChange({
                target: { value: event.floatValue },
              });
            }
          }}
        ></NumericFormat>
      </>
    );
  }
}
