"use client";

import { Key, useState } from "react";
import Avatar from "boring-avatars";
import { SingleValue } from "react-select";
import {
  FaRegCircleXmark,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

import Controls from "./controls";
import Modal from "./modal";

import { User } from "./types/user";

export type GalleryProps = {
  users: User[];
};

export type Options = {label: string; value: string; };

const Gallery = ({ users }: GalleryProps) => {
  const [usersList, setUsersList] = useState<GalleryProps[]>(users);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortDirection, setSortDirection] = useState<Options | null>(null);
  const [sortField, setSortField] = useState<Options | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = (id: number) => {
    const user =
      usersList.find((item: { id: number }) => item.id === id) || null;

    if (user) {
      setSelectedUser(user);
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const getProperty = (object: { users: User[] }, path: string): any | undefined => {
    const properties = path.split('.');
  
    if (!object || typeof object !== 'object') {
      return undefined;
    }

    const nestedObject = properties.reduce((currentObject: { [key: string]: any }, prop: string | number) => {
      // Add checks to ensure safe property access
      return currentObject && typeof currentObject === 'object' ? currentObject[prop] : undefined;
    }, object);
    return nestedObject;
  };

  const sortGallery = (list: GalleryProps[], value: string): GalleryProps[] => {
    return [...list].sort((a, b) => {
      const aValue = getProperty(a, value) || '';
      const bValue = getProperty(b, value) || '';

      if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue);
      }

      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    });
  };

  const filterField = (value: SingleValue<Options> | Options) => {
    const sortedList = sortGallery(usersList, value?.value ?? '').sort((a, b) => (sortDirection?.value !== 'descending' ? 1 : -1));

    setSortField(value);
    setUsersList(sortedList);
  };

  const filterDirection = (value: SingleValue<Options> | Options) => {
    const sortedList = sortGallery(usersList, sortField?.value ?? '').sort((a, b) => (value?.value !== 'descending' ? 1 : -1));

    setSortDirection(value);
    setUsersList(sortedList);
  };

  return (
    <div className="user-gallery">
      <div className="heading">
        <h1 className="title">Users</h1>
        <Controls
          field={sortField}
          direction={sortDirection}
          filterField={filterField}
          filterDirection={filterDirection}
        />
      </div>
      <div className="items">
        {usersList.map(
          (
            user: { id: number; name: string; company: { name: string } },
            index: Key
          ) => (
            <div
              className="item user-card"
              key={index}
              onClick={() => handleModalOpen(user.id)}
            >
              <div className="body">
                <Avatar
                  size={96}
                  name={user.name}
                  variant="marble"
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
              </div>
              <div className="info">
                <div className="name">{user.name}</div>
                <div className="company">{user.company.name}</div>
              </div>
            </div>
          ))}
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <div className="user-panel">
            <div className="header">
              <div
                role="button"
                tabIndex={0}
                className="close"
                onClick={handleModalClose}
              >
                <FaRegCircleXmark size={32} />
              </div>
            </div>
            <div className="body">
              {selectedUser && (
                <div className="user-info info">
                  <div className="avatar">
                    <Avatar
                      size={240}
                      name={selectedUser.name}
                      variant="marble"
                      colors={[
                        "#92A1C6",
                        "#146A7C",
                        "#F0AB3D",
                        "#C271B4",
                        "#C20D90",
                      ]}
                    />
                  </div>
                  <div className="name">
                    {selectedUser.name} ({selectedUser.username})
                  </div>
                  <div className="field">
                    <FaLocationDot className="icon" />
                    <div className="data">{`${selectedUser.address.street}, ${selectedUser.address.suite}, ${selectedUser.address.city}`}</div>
                  </div>
                  <div className="field">
                    <FaPhone className="icon" />
                    <div className="value">{selectedUser.phone}</div>
                  </div>
                  <div className="fields">
                    <FaEnvelope className="icon" />
                    <div className="value">{selectedUser.email}</div>
                  </div>
                  <div className="company">
                    <div className="name">{selectedUser.company.name}</div>
                    <div className="catchphrase">
                      {selectedUser.company.catchPhrase}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Gallery;
