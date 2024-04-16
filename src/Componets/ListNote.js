import React, { useEffect, useState } from "react";
import {
  IconList,
  IconBriefcase,
  IconShare,
  IconStar,
  IconFile,
} from "@tabler/icons-react";
import $ from "jquery";
import Modal from "react-bootstrap/Modal";
import NoteCard from "./Common/NoteCard";
import moment from "moment";
import { addItem, getAllItems, updateItem, deleteItem } from "../db/db";

const ListNote = () => {
  const [activeList, setActiveList] = useState("all");
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    created_date: "",
  });
  const [show, setShow] = useState(false);
  const [deleteModalshow, setDeleteModalShow] = useState(false);
  const [updateModalshow, setUpdateModalShow] = useState(false);
  const [noteData, setNoteData] = useState([]);

  const [deleteId, setDeleteId] = useState();
  const [updateId, setUpdateId] = useState();

  const handleClose = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      created_date: "",
    });
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleUpdateClose = () => {
    setFormData({
      title: "",
      category: "",
      description: "",
      created_date: "",
    });
    setUpdateModalShow(false);
  };
  const handleUpdateShow = ({
    id,
    title,
    category,
    description,
  }) => {
    setUpdateId(id);
    setFormData({
      title,
      category,
      description,
    });
    setUpdateModalShow(true);
  };
  const handleDeleteClose = () => setDeleteModalShow(false);

  const ChangeList = (id) => {
    $(`#${activeList}`).removeClass("active");
    setActiveList(id);
    getAllData(id);
    $(`#${id}`).addClass("active");
  };

  useEffect(() => {
    getAllData(activeList);
  }, []);

  const getAllData = (category) => {
    const data = getAllItems(category);
    setNoteData(data);
  };

  const handleAddNotesForm = (e) => {
    const { name, value, id } = e.target;
    $(e.target).removeClass("error-input");
    $(`#error-${id}`).text("");
    setFormData({ ...formData, [name]: value });
  };

  const validation = () => {
    var isError = false;
    if (formData.title.length === 0) {
      $("#title").addClass("error-input");
      $("#error-title").text(`Title is required`);
      isError = true;
    }
    if (formData.category.length === 0) {
      $("#category").addClass("error-input");
      $("#error-category").text(`Category is required`);
      isError = true;
    }
    if (formData.description.length === 0) {
      $("#description").addClass("error-input");
      $("#error-description").text(`Description is required`);
      isError = true;
    }
    return isError ? false : true;
  };

  const AddNote = () => {
    const id = Date.now();
    const created_date = moment();
    if (validation()) {
      const final_data = { ...formData, id, created_date };
      addItem(final_data);
      getAllData(activeList);
      handleClose();
    }
  };

  const DeleteConfirmation = (id) => {
    setDeleteId(id);
    setDeleteModalShow(true);
  };
  const DeleteNote = () => {
    deleteItem(deleteId);
    setDeleteId();
    setDeleteModalShow(false);
    getAllData(activeList);
  };

  const UpdateNote = () => {
    if (validation()) {
      updateItem(updateId, formData);
      getAllData(activeList);
      handleUpdateClose();
    }
  };
  return (
    <>
      <div className="body-wrapper">
        <div className="container-fluid">
          <div className="card bg-info-subtle shadow-none position-relative overflow-hidden mb-4">
            <div className="card-body px-4 py-3">
              <div className="row align-items-center">
                <div className="col-9">
                  <h4 className="fw-semibold m-0">Manage Notes</h4>
                </div>
              </div>
            </div>
          </div>
          <ul className="nav nav-pills p-3 mb-3 rounded align-items-center card flex-row">
            <li className="nav-item">
              <button
                className="nav-link gap-6 note-link d-flex align-items-center justify-content-center px-3 px-md-3 active cursor-pointer"
                id="all"
                href=""
                onClick={() => {
                  ChangeList("all");
                }}
              >
                <IconList stroke={2} height={16} width={16} />
                <span className="d-none d-md-block fw-medium ">All Notes</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link gap-6 note-link d-flex align-items-center justify-content-center px-3 px-md-3 cursor-pointer"
                id="business"
                onClick={() => {
                  ChangeList("business");
                }}
                href=""
              >
                <IconBriefcase stroke={2} height={16} width={16} />
                <span className="d-none d-md-block fw-medium">Business</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link gap-6 note-link d-flex align-items-center justify-content-center px-3 px-md-3 cursor-pointer"
                id="social"
                onClick={() => {
                  ChangeList("social");
                }}
                href=""
              >
                <IconShare stroke={2} height={16} width={16} />
                <span className="d-none d-md-block fw-medium">Social</span>
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link gap-6 note-link d-flex align-items-center justify-content-center px-3 px-md-3 cursor-pointer"
                id="important"
                onClick={() => {
                  ChangeList("important");
                }}
                href=""
              >
                <IconStar stroke={2} height={16} width={16} />
                <span className="d-none d-md-block fw-medium">Important</span>
              </button>
            </li>
            <li className="nav-item ms-auto">
              <button
                className="btn btn-primary d-flex align-items-center px-3 gap-6"
                id="add-notes"
                onClick={handleShow}
              >
                <IconFile stroke={2} height={16} width={16} />
                <span className="d-none d-md-block fw-medium fs-3">
                  Add Notes
                </span>
              </button>
            </li>
          </ul>
          <div className="tab-content">
            <div id="note-full-container" className="note-has-grid row">
              {noteData &&
                noteData.map((item, i) => {
                  return (
                    <NoteCard
                      data={item}
                      key={i}
                      OnDelete={DeleteConfirmation}
                      OnUpdate={handleUpdateShow}
                    />
                  );
                })}
            </div>
            <div className="text-center">
              <h3 className="fs-6 fw-bolder">
                {noteData && noteData.length == 0 ? "No Notes" : ""}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label" htmlFor="firstName2">
                  Note Title*
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="title"
                  onChange={handleAddNotesForm}
                  placeholder="Title..."
                />
                <span
                  className="fs-2 fw-bolder error-text"
                  id="error-title"
                ></span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label" htmlFor="firstName2">
                  Note Category*
                </label>
                <select
                  className="form-select mr-sm-2"
                  id="category"
                  name="category"
                  onChange={handleAddNotesForm}
                >
                  <option value={""}>Choose Category</option>
                  <option value={"business"}>Business</option>
                  <option value={"social"}>Social</option>
                  <option value={"important"}>Important</option>
                </select>
                <span
                  className="fs-2 fw-bolder error-text"
                  id="error-category"
                ></span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label" htmlFor="lastName2">
                  Note Description*
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  rows={4}
                  placeholder="Description..."
                  onChange={handleAddNotesForm}
                />
                <span
                  className="fs-2 fw-bolder error-text"
                  id="error-description"
                ></span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn bg-danger-subtle text-danger"
            onClick={handleClose}
          >
            Discard
          </button>
          <button className="btn btn-primary" onClick={AddNote}>
            Add Notes
          </button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={deleteModalshow} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this note ?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn bg-danger-subtle text-danger"
            onClick={handleDeleteClose}
          >
            No
          </button>
          <button
            className="btn btn-primary"
            id="deleteBtn"
            onClick={DeleteNote}
          >
            Yes
          </button>
        </Modal.Footer>
      </Modal>

      {/* Update Modal */}
      <Modal show={updateModalshow} onHide={handleUpdateClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Notes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label" htmlFor="firstName2">
                  Note Title*
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  id="title"
                  onChange={handleAddNotesForm}
                  placeholder="Title..."
                  value={formData.title}
                />
                <span
                  className="fs-2 fw-bolder error-text"
                  id="error-title"
                ></span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label" htmlFor="firstName2">
                  Note Category*
                </label>
                <select
                  className="form-select mr-sm-2"
                  id="category"
                  name="category"
                  onChange={handleAddNotesForm}
                  defaultValue={formData.category}
                >
                  <option value={""}>Choose Category</option>
                  <option value={"business"}>Business</option>
                  <option value={"social"}>Social</option>
                  <option value={"important"}>Important</option>
                </select>
                <span
                  className="fs-2 fw-bolder error-text"
                  id="error-category"
                ></span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="mb-3">
                <label className="form-label" htmlFor="lastName2">
                  Note Description*
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  rows={4}
                  placeholder="Description..."
                  onChange={handleAddNotesForm}
                  defaultValue={formData.description}
                />
                <span
                  className="fs-2 fw-bolder error-text"
                  id="error-description"
                ></span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn bg-danger-subtle text-danger"
            onClick={handleUpdateClose}
          >
            Discard
          </button>
          <button className="btn btn-primary" onClick={UpdateNote}>
            Update Notes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ListNote;
