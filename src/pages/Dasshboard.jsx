import { useEffect, useState } from "react";
import {
  Layout,
  Card,
  Button,
  Form,
  Input,
  Upload,
  Table,
  message,
  Row,
  Col,
  Avatar,
  Modal,
  Tag,
  Spin,
} from "antd";
import {
  UserOutlined,
  BookOutlined,
  CreditCardOutlined,
  LogoutOutlined,
  UploadOutlined,
  DashboardOutlined,
  CameraOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import API from "../api/axios";
import CourseCard from "../pages/CourseCard";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const { Sider, Content } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [data, setData] = useState(null);
  const [form] = Form.useForm();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = () => {
    API.get("accounts/dashboard/")
      .then((res) => {
        setData(res.data);

        if (res.data.profile_picture) {
          const imageUrl = res.data.profile_picture.startsWith("http")
            ? res.data.profile_picture
            : `http://127.0.0.1:8000${res.data.profile_picture}`;
          setProfileImage(imageUrl);
        }

        form.setFieldsValue({
          username: res.data.username,
          email: res.data.email,
        });

        setLoading(false);
      })
      .catch(() => {
        message.error("Failed to load dashboard");
        setLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem("access");
    navigate("/");
  };

  const updateProfile = (values) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);

    if (values.profile_picture?.file) {
      formData.append("profile_picture", values.profile_picture.file);
    }

    API.put("accounts/update-profile/", formData)
      .then(() => {
        message.success("Profile updated!");
        setEditModalVisible(false);
        loadDashboard();
      })
      .catch(() => message.error("Update failed"));
  };

  const paymentColumns = [
    {
      title: "Course",
      dataIndex: "course",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "approved" ? "green" : status === "pending" ? "orange" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
    },
  ];

  const menuItems = [
    { key: "overview", icon: <DashboardOutlined />, label: "Overview" },
    { key: "courses", icon: <BookOutlined />, label: "My Courses" },
    { key: "payments", icon: <CreditCardOutlined />, label: "Payments" },
    { key: "profile", icon: <UserOutlined />, label: "Profile" },
    { key: "logout", icon: <LogoutOutlined />, label: "Logout" },
  ];

  const handleMenuClick = (e) => {
    if (e.key === "logout") logout();
    else setActiveTab(e.key);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Layout className="dashboard-layout">

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"          
        collapsedWidth="70"      
        className="dashboard-sider"
        theme="light"
      >
        <div className="sidebar-logo">Speako</div>

        <div className="sidebar-menu">
          {menuItems.map((item) => (
            <motion.div
              key={item.key}
              whileHover={{ x: 4 }}
              onClick={() => handleMenuClick({ key: item.key })}
              className={`menu-item ${activeTab === item.key ? "active" : ""}`}
            >
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </motion.div>
          ))}
        </div>
      </Sider>

      <Layout>

        <div className="dashboard-header">
          <div className="header-user">
            <Avatar
              size={48}
              src={profileImage}
              icon={<UserOutlined />}
            />
            <div>
              <p className="user-name">{data?.username}</p>
              <p className="user-email">{data?.email}</p>
            </div>
          </div>
        </div>

        <Content className="dashboard-content">

          {activeTab === "overview" && (
            <>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                  <Card className="stat-card">
                    <BookOutlined />
                    <h3>{data?.courses?.length || 0}</h3>
                    <p>Courses</p>
                  </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                  <Card className="stat-card">
                    <CheckCircleOutlined />
                    <h3>{data?.payments?.length || 0}</h3>
                    <p>Completed</p>
                  </Card>
                </Col>
              </Row>

              <Card className="section-card">
                <Table
                  columns={paymentColumns}
                  dataSource={data?.payments || []}
                  scroll={{ x: true }}  
                />
              </Card>
            </>
          )}

          {activeTab === "courses" && (
            <Row gutter={[16, 16]}>
              {data?.courses?.map((course) => (
                <Col key={course.id} xs={24} sm={12} lg={8}>
                  <CourseCard course={course} />
                </Col>
              ))}
            </Row>
          )}

          {activeTab === "profile" && (
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card className="profile-card">
                  <Avatar size={120} src={profileImage} />
                  <Button block onClick={() => setEditModalVisible(true)}>
                    Change Photo
                  </Button>
                </Card>
              </Col>

              <Col xs={24} lg={16}>
                <Card className="profile-card">
                  <Form form={form} layout="vertical" onFinish={updateProfile}>
                    <Form.Item name="username" label="Username">
                      <Input />
                    </Form.Item>

                    <Form.Item name="email" label="Email">
                      <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block>
                      Save Changes
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          )}
        </Content>
      </Layout>

      <Modal
        title="Update Profile Picture"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={updateProfile}>
          <Form.Item name="profile_picture">
            <Upload maxCount={1}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form>
      </Modal>
    </Layout>
  );
}