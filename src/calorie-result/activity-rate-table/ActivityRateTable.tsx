import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { activityLabels, activityRates, ActivityType } from '../../model';

interface TableRow {
  activityLevel: string;
  rate: number;
}

type MealTableProps = Omit<TableProps<TableRow>, 'columns' | 'dataSource'>;

const allActivityTypes = Object.values(ActivityType);
const tableColumns: ColumnsType<TableRow> = [
  {
    title: 'Exercise per week',
    dataIndex: 'activityLevel',
    key: 'activityLevel',
  },
  {
    title: 'Activity rate',
    dataIndex: 'rate',
    key: 'rate',
  },
];
const tableData: TableRow[] = allActivityTypes.map((type) => (
  {
    key: type,
    activityLevel: activityLabels[type],
    rate: activityRates[type],
  }
));

export const ActivityRateTable = (props: MealTableProps) => (
  <Table
    columns={tableColumns}
    dataSource={tableData}
    {...props}
  />
);

export default ActivityRateTable;