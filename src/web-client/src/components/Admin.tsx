import React, { useCallback, useState } from "react";
import { useAddTagMutation } from "../graphql/generated/schema";

export const Admin: React.FC = () => {
  return (
    <div className="block has-background-white">
      <div className="block">
        <div className="field">
          <label className="label">Your GitHub account</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="e.g vladbatushkov"
            />
          </div>
        </div>
      </div>
      <div className="panel is-info">
        <p className="panel-heading">Tags of Interests</p>
        <div className="panel-block">
          <div className="field has-addons">
            <p className="control is-expanded">
              <input className="input" type="text" placeholder="e.g. GraphQL" />
            </p>
            <p className="control is-expanded">
              <button className="button is-info is-outlined is-fullwidth">
                Add item
              </button>
            </p>
          </div>
        </div>
        <label className="checkbox panel-block is-active">
          <input type="checkbox" />
          GraphQL
        </label>
        <label className="checkbox panel-block is-active">
          <input type="checkbox" />
          .NET
        </label>
        <label className="checkbox panel-block is-active">
          <input type="checkbox" />
          JavaScript
        </label>
        <label className="checkbox panel-block is-active">
          <input type="checkbox" />
          Hot Chocolate
        </label>
        <label className="checkbox panel-block is-active">
          <input type="checkbox" />
          Neo4j
        </label>
        <label className="checkbox panel-block is-active">
          <input type="checkbox" />
          React
        </label>
        <label className="checkbox panel-block is-active">
          <input type="checkbox" />
          AWS
        </label>
        <label className="checkbox panel-block is-active">
          <input type="checkbox" />
          DynamoDB
        </label>
        <label className="checkbox panel-block is-active">
          <input type="checkbox" />
          Node
        </label>
        <div className="panel-block">
          <button className="button is-danger is-outlined is-fullwidth">
            Delete selected items
          </button>
        </div>
      </div>
    </div>
  );
};
