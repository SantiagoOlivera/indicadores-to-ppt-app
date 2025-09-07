import type { Row } from "./Row";

function Table({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children?: React.ReactElement<typeof Row> | React.ReactElement<typeof Row>[];
}) {
  return (
    <>
      <div
        id={`table-container-${id}`}
        className="w-100  border-secondary rounded"
      >
        <h1>{title}</h1>
        <table id={`table-${id}`} className="table w-100">
          {children}
        </table>
      </div>
    </>
  );
}

export default Table;
