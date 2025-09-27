import React, { useState } from "react";
import { Table, Input, Button, Space, Modal, Form, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Dataset = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const tamilnaduDistricts = [
    { label: "Chennai", value: "Chennai" },
    { label: "Coimbatore", value: "Coimbatore" },
    { label: "Madurai", value: "Madurai" },
    { label: "Salem", value: "Salem" },
    { label: "Tiruchirappalli", value: "Tiruchirappalli" },
  ];

  const colleges = [
    { label: "Anna University", value: "Anna University" },
    { label: "PSG College", value: "PSG College" },
    { label: "Madras Medical College", value: "MMC" },
  ];

  const schools = [
    { label: "DAV School", value: "DAV" },
    { label: "Velammal School", value: "Velammal" },
    { label: "Kendriya Vidyalaya", value: "KV" },
  ];

  const labList = [
    { label: "Physics Lab", value: "Physics Lab" },
    { label: "Chemistry Lab", value: "Chemistry Lab" },
    { label: "Computer Lab", value: "Computer Lab" },
  ];

  const linuxOptions = [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

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
    item.districts?.toLowerCase().includes(searchText.toLowerCase()) ||
    item.type?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "District", dataIndex: "districts", key: "districts" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "College/School", dataIndex: "institute", key: "institute" },
    { title: "Lab", dataIndex: "lab", key: "lab" },
    { title: "Linux User", dataIndex: "linux", key: "linux" },
    { title: "Percentage", dataIndex: "percentage", key: "percentage" },
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
          {/* District */}
          <Form.Item name="districts" label="District" rules={[{ required: true }]}>
            <Select
              showSearch
              placeholder="Select District"
              options={tamilnaduDistricts}
            />
          </Form.Item>

          {/* College / School */}
          <Form.Item name="type" label="College or School" rules={[{ required: true }]}>
            <Select
              placeholder="Select Type"
              options={[
                { label: "College", value: "College" },
                { label: "School", value: "School" }
              ]}
            />
          </Form.Item>

          {/* Conditional Fields */}
          <Form.Item shouldUpdate={(prev, curr) => prev.type !== curr.type}>
            {({ getFieldValue }) =>
              getFieldValue("type") === "College" ? (
                <>
                  <Form.Item name="institute" label="College" rules={[{ required: true }]}>
                    <Select placeholder="Select College" options={colleges} />
                  </Form.Item>
                  <Form.Item name="lab" label="Lab" rules={[{ required: true }]}>
                    <Select placeholder="Select Lab" options={labList} />
                  </Form.Item>
                  <Form.Item name="linux" label="Linux User" rules={[{ required: true }]}>
                    <Select placeholder="Yes / No" options={linuxOptions} />
                  </Form.Item>
                  <Form.Item name="percentage" label="Percentage" rules={[{ required: true }]}>
                    <Input type="number" placeholder="Enter %" />
                  </Form.Item>
                </>
              ) : getFieldValue("type") === "School" ? (
                <>
                  <Form.Item name="institute" label="School" rules={[{ required: true }]}>
                    <Select placeholder="Select School" options={schools} />
                  </Form.Item>
                  <Form.Item name="lab" label="Lab" rules={[{ required: true }]}>
                    <Select placeholder="Select Lab" options={labList} />
                  </Form.Item>
                  <Form.Item name="linux" label="Linux User" rules={[{ required: true }]}>
                    <Select placeholder="Yes / No" options={linuxOptions} />
                  </Form.Item>
                  <Form.Item name="percentage" label="Percentage" rules={[{ required: true }]}>
                    <Input type="number" placeholder="Enter %" />
                  </Form.Item>
                </>
              ) : null
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dataset;
