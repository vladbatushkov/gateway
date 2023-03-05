import React, { useState } from "react";
import { useAppContext } from "../AppContext";
import { UserInput } from "./UserInput";

export const RightSection: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const user = state.userInfo;

  return (
    <>
      <UserInput />
      <div className="columns is-multiline">
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-1by1">
                <img src={user.image} />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">{user.name}</p>
                  <p className="subtitle is-6">@{user.login}</p>
                </div>
              </div>

              <div className="content">{user.bio}</div>

              <div className="tags are-medium">
                {user.technologies?.map((x) => (
                  <span className="tag is-link is-light" key={x}>
                    {x}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-1by1">
                <img src="https://avatars.githubusercontent.com/u/29859822?v=4" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Alena Batushkova</p>
                  <p className="subtitle is-6">@abatushkova</p>
                </div>
              </div>

              <div className="content">No Bio</div>

              <div className="tags are-medium">
                <span className="tag is-link is-light">React</span>
                <span className="tag is-link is-light">JavaScript</span>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-1by1">
                <img src="https://avatars.githubusercontent.com/u/488464?v=4" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Keattisak Chinburarat</p>
                  <p className="subtitle is-6">@kchinburarat</p>
                </div>
              </div>

              <div className="content">Senior Software Engineer @Agoda</div>

              <div className="tags are-medium">
                <span className="tag is-link is-light">GraphQL</span>
                <span className="tag is-link is-light">.NET</span>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-1by1">
                <img src="https://avatars.githubusercontent.com/u/2327615?v=4" />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Tobias Meixner</p>
                  <p className="subtitle is-6">@meixnertobias</p>
                </div>
              </div>

              <div className="content">
                Do web things using React, Apollo, GraphQL, Node, DynamoDB,
                Serverless and AWS
              </div>

              <div className="tags are-medium">
                <span className="tag is-link is-light">GraphQL</span>
                <span className="tag is-link is-light">React</span>
                <span className="tag is-link is-light">Node</span>
                <span className="tag is-link is-light">AWS</span>
                <span className="tag is-link is-light">DynamoDB</span>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="card">
            <div className="card-image">
              <figure className="image is-1by1">
                <img
                  src="https://avatars.githubusercontent.com/u/9714350?v=4"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Michael Staib</p>
                  <p className="subtitle is-6">@michaelstaib</p>
                </div>
              </div>

              <div className="content">
                GraphQL Technical Steering Committee | Microsoft MVP | Author of
                Hot Chocolate | https://twitter.com/michael_staib
              </div>

              <div className="tags are-medium">
                <span className="tag is-link is-light">GraphQL</span>
                <span className="tag is-link is-light">.NET</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
