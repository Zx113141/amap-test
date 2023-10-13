import { ColumnProps } from 'ant-design-vue/es/table';
import { Tag, Tooltip, Space } from 'ant-design-vue';
import { QuestionCircleOutlined } from '@ant-design/icons-vue';

export const columns: ColumnProps[] = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'toIndex',
        width: 80,
    },
    {
        title: '地图编号ID',
        dataIndex: 'node_name',
        width: 150,
    },
    {
        title: "编辑者",
        dataIndex: 'editor',
        customRender: ({ record, text }: any) => (
            <span>{text ? text : '-'}</span>
        ),
        width: 80,
    },
    {
        title: '编辑内容',
        dataIndex: 'content',
        width: 100,
        customRender: ({ text }: any) => (
            <span>{text ? text : '-'}</span>
        ),
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        width: 150,
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: 150,
        customRender: ({ text }) => <Tag color={text === '正常' ? 'success' : 'error'}>{text}</Tag>,
    },
    {
        title: '操作',
        key: 'action',
        width: 180,
        // slots: { customRender: 'action' },
    },
];
