import React, { useState } from "react";
import { Table, Input, Button, Space, Modal, Form } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Dataset = () => {
  const [data, setData] = useState([
    { key: "1", community: "Build2learn", email: "john@example.com" },
    { key: "2", community: "Jane Smith", email: "jane@example.com" },
  ]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  // Handle Add/Edit
  const showModal = (record = null) => {
    setEditingRecord(record);
    setIsModalVisible(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        setData(prev =>
          prev.map(item =>
            item.key === editingRecord.key ? { ...item, ...values } : item
          )
        );
      } else {
        setData(prev => [
          ...prev,
          { key: Date.now().toString(), ...values },
        ]);
      }
      setIsModalVisible(false);
      setEditingRecord(null);
    });
  };

  const handleDelete = (key) => {
    setData(prev => prev.filter(item => item.key !== key));
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) ||
    item.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2>Dataset Title</h2>
        <Space>
          <Input.Search
            placeholder="Search..."
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Add
          </Button>
        </Space>
      </div>

      {/* Table */}
      <Table columns={columns} dataSource={filteredData} />

      {/* Modal */}
      <Modal
        title={editingRecord ? "Edit Record" : "Add Record"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dataset;
