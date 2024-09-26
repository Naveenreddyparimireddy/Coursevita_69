import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  createInternship,
  uploadDocument,
  removeSuccess,
  removeError,
} from "../store/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class InternshipApplication extends React.Component {
  componentWillUnmount() {
    const { removeSuccess, removeError } = this.props;
    removeSuccess();
    removeError();
  }

  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      files: {},
      fileNOC: null,
      fileOL: null,
      fileFE: null,
      fileSE: null,
      fileTE: null,
      fileBE: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submitNOCFile = this.submitNOCFile.bind(this);
    this.submitOL = this.submitOL.bind(this);
    this.submitFE = this.submitFE.bind(this);
    this.submitSE = this.submitSE.bind(this);
    this.submitTE = this.submitTE.bind(this);
    this.submitBE = this.submitBE.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  submitNOCFile(event) {
    this.setState({ fileNOC: event.target.files[0] });
    this.handleUpload("NOC", "NOCLabel");
    let filename = event.target.files[0].name;
    this.setState((prevState) => ({
      files: {
        ...prevState.files,
        ["NOC"]: filename,
      },
    }));
  }

  submitOL(event) {
    this.setState({ fileOL: event.target.files[0] });
    this.handleUpload("offerLetter", "offerLetterLabel");
    let filename = event.target.files[0].name;
    this.setState((prevState) => ({
      files: {
        ...prevState.files,
        ["offerLetter"]: filename,
      },
    }));
  }

  submitFE(event) {
    this.setState({ fileFE: event.target.files[0] });
    this.handleUpload("FEMarksheet", "FEMarksheetLabel");
    let filename = event.target.files[0].name;

    this.setState((prevState) => ({
      files: {
        ...prevState.files,
        ["FEMarksheet"]: filename,
      },
    }));
  }

  submitSE(event) {
    this.setState({ fileSE: event.target.files[0] });
    this.handleUpload("SEMarksheet", "SEMarksheetLabel");
    let filename = event.target.files[0].name;
    this.setState((prevState) => ({
      files: {
        ...prevState.files,
        ["SEMarksheet"]: filename,
      },
    }));
  }

  submitTE(event) {
    this.setState({ fileTE: event.target.files[0] });
    this.handleUpload("TEMarksheet", "TEMarksheetLabel");
    let filename = event.target.files[0].name;
    this.setState((prevState) => ({
      files: {
        ...prevState.files,
        ["TEMarksheet"]: filename,
      },
    }));
  }

  submitBE(event) {
    this.setState({ fileBE: event.target.files[0] });
    this.handleUpload("BEMarksheet", "BEMarksheetLabel");
    let filename = event.target.files[0].name;
    this.setState((prevState) => ({
      files: {
        ...prevState.files,
        ["BEMarksheet"]: filename,
      },
    }));
  }

  handleChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    var formData = new FormData(event.target);
    const data = { application: {} };
    for (var [key, value] of formData.entries()) {
      if (key !== "files") data["application"][key] = value;
    }
    data["application"]["submittedDate"] = new Date().toUTCString();
    data["application"]["NOCRequired"] =
      document.getElementById("NOCRequired").checked;

    const formDataFile = new FormData();
    formDataFile.append("docs", this.state.fileOL);
    data["files"] = this.state.files;

    if (this.state.fileFE !== null) {
      formDataFile.append("docs", this.state.fileFE);
    }
    if (this.state.fileSE !== null) {
      formDataFile.append("docs", this.state.fileSE);
    }
    if (this.state.fileTE !== null) {
      formDataFile.append("docs", this.state.fileTE);
    }
    if (this.state.fileBE !== null) {
      formDataFile.append("docs", this.state.fileBE);
    }
    if (this.state.fileNOC !== null) {
      formDataFile.append("docs", this.state.fileNOC);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { uploadDocument, createInternship } = this.props;
    uploadDocument(formDataFile, config);
    createInternship(data).then(() => {
      alert("Application submitted!");
    });
  }

  handleUpload(id, labelId) {
    var fileName = document.getElementById(id).value.split("\\").pop();
    document.getElementById(labelId).classList.add("selected");
    document.getElementById(labelId).innerHTML = fileName;
  }

  render() {
    return (
      <div className="container-fluid">
        <h4 className="mt-2">Apply</h4>
        <div
          className="alert alert-secondary alert-dismissible fade show"
          role="alert"
        >
          <strong>P.S. </strong> Please update your profile before applying.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <hr />

        <form id="form" onSubmit={this.handleSubmit}>
          Internship Details:
          <hr />
          <div className="container-fluid">
            <div className="form-row my-2">
              <div className="col-sm-6">
                Company: <span className="text-danger">*</span>
                <input
                  type="text"
                  name="workplace"
                  id="workplace"
                  className="form-control"
                  placeholder="eg. Google"
                  required
                />
              </div>
              <div className="col-sm-3">
                Start Date: <span className="text-danger">*</span>
                <div className="input-group">
                  <DatePicker
                    name="startDate"
                    id="startDate"
                    className="form-control"
                    dateFormat="yyyy/MM/dd"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                    minDate={new Date()}
                    showDisabledMonthNavigation
                  />
                </div>
              </div>
              <div className="col-sm-3">
                Duration: <span className="text-danger">*</span>
                <div className="input-group">
                  <input
                    type="number"
                    name="durationOfInternship"
                    id="durationOfInternship"
                    placeholder="eg. 1"
                    className="form-control"
                    required
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">month(s)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row my-2">
              <div className="col-sm-6">
                Type of Internship: <span className="text-danger">*</span>
                <input
                  type="text"
                  name="internshipType"
                  id="internshipType"
                  className="form-control"
                  placeholder="eg. Work from home"
                  required
                />
              </div>

              <div className="col-sm-6">
                Stipend: <span className="text-danger">*</span>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroupPrependRs"
                    >
                      Rs.{" "}
                    </span>
                  </div>
                  <input
                    type="number"
                    className="form-control"
                    id="stipend"
                    name="stipend"
                    placeholder="eg. 10000"
                    aria-describedby="inputGroupPrependRs"
                    required
                  />
                  <div className="input-group-append">
                    <span className="input-group-text">/month</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row my-2">
              <div className="col-sm-6">
                NOC required: <span className="text-danger">*</span>
                <input
                  type="text"
                  name="NOCRequired"
                  id="NOCRequired"
                  className="form-control"
                  placeholder="Yes/No"
                />
              </div>
              <div className="col-sm-6">
                Reference: <span className="text-danger">*</span>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroupPrependRef"
                    >
                      Ref.
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="reference"
                    name="reference"
                    placeholder="eg. John Doe"
                    aria-describedby="inputGroupPrependRef"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <h5>Documents:</h5>
            <hr />
            <div className="row">
              <div className="col-sm-6">
                <label
                  htmlFor="NOC"
                  className="btn btn-outline-secondary"
                  id="NOCLabel"
                >
                  Upload NOC
                </label>
                <input
                  type="file"
                  id="NOC"
                  className="d-none"
                  onChange={this.submitNOCFile}
                />
              </div>
              <div className="col-sm-6">
                <label
                  htmlFor="offerLetter"
                  className="btn btn-outline-secondary"
                  id="offerLetterLabel"
                >
                  Upload Offer Letter
                </label>
                <input
                  type="file"
                  id="offerLetter"
                  className="d-none"
                  onChange={this.submitOL}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-6">
                <label
                  htmlFor="FEMarksheet"
                  className="btn btn-outline-secondary"
                  id="FEMarksheetLabel"
                >
                  Upload FE Marksheet
                </label>
                <input
                  type="file"
                  id="FEMarksheet"
                  className="d-none"
                  onChange={this.submitFE}
                />
              </div>
              <div className="col-sm-6">
                <label
                  htmlFor="SEMarksheet"
                  className="btn btn-outline-secondary"
                  id="SEMarksheetLabel"
                >
                  Upload SE Marksheet
                </label>
                <input
                  type="file"
                  id="SEMarksheet"
                  className="d-none"
                  onChange={this.submitSE}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-sm-6">
                <label
                  htmlFor="TEMarksheet"
                  className="btn btn-outline-secondary"
                  id="TEMarksheetLabel"
                >
                  Upload TE Marksheet
                </label>
                <input
                  type="file"
                  id="TEMarksheet"
                  className="d-none"
                  onChange={this.submitTE}
                />
              </div>
              <div className="col-sm-6">
                <label
                  htmlFor="BEMarksheet"
                  className="btn btn-outline-secondary"
                  id="BEMarksheetLabel"
                >
                  Upload BE Marksheet
                </label>
                <input
                  type="file"
                  id="BEMarksheet"
                  className="d-none"
                  onChange={this.submitBE}
                />
              </div>
            </div>
          </div>
          <div className="mt-3">
            <button type="submit" className="btn btn-primary">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  success: state.success,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  createInternship: (data) => dispatch(createInternship(data)),
  uploadDocument: (data, config) => dispatch(uploadDocument(data, config)),
  removeSuccess: () => dispatch(removeSuccess()),
  removeError: () => dispatch(removeError()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(InternshipApplication)
);
