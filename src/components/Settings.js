import { useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";

import { setting } from "../storage";
import MyCard from "../components/MyCard";

const Settings = () => {
  const { handleSubmit, handleChange, values, setValues } = useFormik({
    // initialValues: config,
    initialValues: {
      tfaRows: 7,
      wsrRows: 7,
      replace1: "\\s",
      replace2: '<span style="color: red">*</span>',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const onSave = async () => {
    try {
      const { tfaRows, wsrRows, replace1, replace2 } = values;
      await setting.setItem("config", { tfaRows, wsrRows, replace1, replace2 });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      const fetchData = async () => {
          try {
              const { tfaRows, wsrRows, replace1, replace2 } = await setting.getItem('config');
              setValues({ tfaRows, wsrRows, replace1, replace2 });
          } catch (error) {
              console.log(error);
          }
      }
      fetchData();
  }, [setValues]);

  return (
    <MyCard title="Settings">
      <Form noValidate onSubmit={handleSubmit} className="form-space-replacer">
        <MyCard title="Two Factor Authenticator - Setting">
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="tfaRows">
                <Form.Label>Text Area Row</Form.Label>
                <Form.Control
                  type="number"
                  name="tfaRows"
                  value={values.tfaRows}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </MyCard>
        <MyCard title="White Space Replacer - Setting">
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="wsrRows">
                <Form.Label>Text Area Row</Form.Label>
                <Form.Control
                  type="number"
                  name="wsrRows"
                  value={values.wsrRows}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="key">
                <Form.Label>From</Form.Label>
                <Form.Control
                  type="text"
                  name="replace1"
                  value={values.replace1}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="val">
                <Form.Label>To</Form.Label>
                <Form.Control
                  type="text"
                  name="replace2"
                  value={values.replace2}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </MyCard>
        <Row>
          <Col>
            <Button
              className="mt-3"
              variant="primary"
              onClick={onSave}
              disabled={!values.replace1 && !values.replace2}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </MyCard>
  );
};

export default Settings;
