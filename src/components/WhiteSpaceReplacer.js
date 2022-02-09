import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";

// import { useSettingConfig } from "../hooks";
import MyCard from '../components/MyCard';

const rows = 7;
const replace1 = '\\s';
const replace2 = '<span style="color: red">*</span>';



const WhiteSpaceReplacer = () => {
  const element1 = useRef(null);
  const element2 = useRef(null);

  const [text1Focus, setText1Focus] = useState(false);
  const [text2Focus, setText2Focus] = useState(false);

  // const [{ wsrRows: rows, replace1, replace2 }] = useSettingConfig();
  
  const { handleSubmit, handleChange, values, setValues } = useFormik({
    initialValues: { text1: `
    dsadsadsd d sdsads 
    dsadad da 
    sdsd   dsdad d
    
    `, text2: "", text3: "" },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const selectText = (element) => {
    let text = "";
    if (document.body.createTextRange) {
      const range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
      text = range.execCommand("copy");
      console.log("range.execCommand: ", text);
    } else if (window.getSelection) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
      text = selection.toString();
      console.log("selection.toString: ", text);
    } else {
      console.warn("Could not select text in node: Unsupported browser.");
    }
    return text;
  };

  const onReplaceText = () => {
    const text2 = values.text1.replaceAll(new RegExp(replace1, "g"), replace2 );
    console.log(text2);
    setValues((old) => ({ ...old, text2 }));
  };

  // const onCleanSymbol = () => {
  //     const text2 = values.text2.replaceAll(new RegExp(replacement[1], 'g'), '');
  //     console.log(text2);
  //     setValues(old => ({...old, text2}));
  // };

  const onCopyText = async () => {
    // element2.current.focus();
    const text1 = selectText(element2.current);
    // const text2 = values.text2;
    // const text3 = text2.replace(new RegExp(replacement[1], "g"), replacement[1]);
    // console.log({text1, text2, text3});

    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text1);
    } else {
      return document.execCommand("copy", true, text1);
    }
  };

  const onClearText = () => {
    setValues({
      text1: "",
      text2: "",
    });
  };

  const onText2Focus = (e) => {
    const text1 = e.target.innerHTML;
    const text2 = text1.replaceAll(new RegExp(replace2, "g"), replace1);
    // console.log('onText2Foucus: ', text1, text2);
    // setValues((old) => ({ ...old, text2 }));
  };

  const onText2Blur = (e) => {
    const text1 = e.target.innerHTML;
    const text2 = text1.replaceAll(new RegExp(replace1, "g"), replace2);
    // console.log('onText2Blur: ', text1, text2);
    // setValues((old) => ({ ...old, text2 }));
  };

  const onText2Paste = (e) => {
    console.log(e);
    const text1 = e.target.innerHTML;
    const text2 = text1.replaceAll(new RegExp(replace1, "g"), replace2);
    console.log('onText2Paste: ', text1, text2);
    e.target.innerHTML = text2;
    // setValues((old) => ({ ...old, text2 }));
  };

  // <p><br></p><p>&nbsp;&nbsp;dsadsadsd d sdsads&nbsp;</p><p>&nbsp;&nbsp;dsadad da&nbsp;</p><p>&nbsp;&nbsp;sdsd&nbsp;&nbsp;dsdad d</p><p>&nbsp;&nbsp;&nbsp;</p><p>&nbsp;&nbsp;&nbsp;</p>

  const onText2Change = (e) => {
    console.log('e: ', e);
    // const text3 = e.replaceAll(new RegExp('&nbsp;', "g"), replace2);
    // setValues(old => ({ ...old, text3 }));
  };

  const onCleanStar = () => {
    console.log('values.text3: ', values.text3);
    const text3 = values.text3.replaceAll('*', '-').replaceAll('&nbsp;', '_');
    setValues(old => ({ ...old, text3 }));
  };

  useEffect(() => {
    if (element1.current && element2.current) {
      element2.current.style.height = element1.current.offsetHeight + "px";
    }
  });

  return (
      <MyCard title="White Space Replacer">
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="form-space-replacer"
        >
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="text1">
                <Form.Label>Original Text</Form.Label>
                <Form.Control
                  as="textarea"
                  ref={element1}
                  rows={rows}
                  name="text1"
                  value={values.text1}
                  onChange={handleChange}
                  onMouseOver={() => setText1Focus(old => old = true)}
                  onMouseLeave={() => setText1Focus(old => old = false)}
                />
                {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text> */}
              </Form.Group>
              <Button
                variant="primary"
                onClick={onReplaceText}
                disabled={!values.text1}
              >
                Replace Text
              </Button>
              <Button
                className="mx-3"
                variant="primary"
                onClick={onClearText}
                disabled={!values.text1}
              >
                Clear
              </Button>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="text2">
                <Form.Label>Ganerated Text</Form.Label>
                <div
                  name="text2"
                  className="form-control text-display"
                  ref={element2}
                  contentEditable="true"
                  dangerouslySetInnerHTML={{ __html: values.text2 }}
                  onInput={onText2Change}
                  // onBlur={handleChange}
                  // onMouseOver={() => setText2Focus(old => old = true)}
                  // onMouseLeave={() => setText2Focus(old => old = false)}
                  // onMouseOver={onText2Focus}
                  // onMouseLeave={onText2Blur}
                  // onPaste={onText2Paste}
                ></div>
                {/* <Form.Control as="textarea" rows={rows} name="text2" value={values.text2} onChange={handleChange} /> */}
              </Form.Group>
              <Button
                variant="primary"
                onClick={onCopyText}
                disabled={!values.text2}
              >
                Copy Text
              </Button>
            </Col>
          </Row>
        </Form>
      </MyCard>
  );
};

export default WhiteSpaceReplacer;
