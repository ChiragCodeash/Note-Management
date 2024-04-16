import {
  IconDotsVertical,
  IconStar,
  IconTrash,
  IconStarFilled,
  IconBriefcaseFilled,
  IconShare,
  IconEdit,
} from "@tabler/icons-react";
import moment from "moment";
import React from "react";

const NoteCard = ({ data , OnDelete , OnUpdate  }) => {
  const { id, created_date, title, category, description } = data;
  return (
    <div className="col-md-4 single-note-item all-category note-social">
      <div className="card card-body">
        <span className="side-stick" />
        <h6
          className="note-title text-truncate w-75 mb-0"
          data-noteheading="Meeting with Mr.Jojo"
        >
          {title}
        </h6>
        <p className="note-date fs-2">{moment(created_date).format("DD MMMM YYYY")}</p>
        <div className="note-content">
          <p
            className="note-inner-content"
            data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis."
          >
            {description}
          </p>
        </div>
        <div className="d-flex align-items-center">
          <div className="link me-1" title={category}>
            {category == "social" ? (
              <IconShare stroke={2} height={16} width={16} title={"Social"} />
            ) : category == "business" ? (
              <IconBriefcaseFilled
                stroke={2}
                height={16}
                width={16}
                title={"Business"}
              />
            ) : category == "important" ? (
              <IconStarFilled
                stroke={2}
                height={16}
                width={16}
                title={"Important"}
              />
            ) : (
              ""
            )}
          </div>
          <div className="link text-danger ms-2 cursor-pointer" title="Delete" onClick={()=>{OnDelete(id)}}>
            <IconTrash stroke={2} height={16} width={16} />
          </div>
          <div className="link text-success ms-2 cursor-pointer" title="Edit" onClick={()=>{OnUpdate({id,  title, category, description})}} >
            <IconEdit stroke={2} height={16} width={16} />
          </div>
          <div className="ms-auto">
            <div className="category-selector btn-group">
              <button
                className="nav-link category-dropdown label-group p-0"
                data-bs-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="true"
              >
                <div className="category">
                  <span className="more-options text-dark">
                    <IconDotsVertical stroke={2} height={16} width={16} />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
