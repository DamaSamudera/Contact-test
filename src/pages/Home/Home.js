import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { deleteData, fetchContact } from './actions';
import { Link } from 'react-router-dom';
import IconArrow from '../../assets/ic-arrow-chevron-down.svg';
import IconAdd from '../../assets/ic-add.png';
import IconDelete from '../../assets/ic-delete.svg';
import ImageEmpty from '../../assets/empty.png';
import Loading from '../../components/fragment/Loading';
import ModalDelete from '../../components/fragment/ModalDelete';
import styles from './styles.scoped.css';

export default function Home() {

  const dispatch = useDispatch();
  const { dataContact = [], isLoadingContact } = useSelector((s) => s.home);

  useEffect(() => {
    dispatch(fetchContact());
  }, []);

  if (isLoadingContact) {
    return <Loading />;
  }

  return (
    <div className={styles['container']}>
      <section className={styles.sidebar}>
        <h5>Total Contact</h5>
        <h3>{dataContact.length}</h3>
      </section>
      <section className={styles.wraper}>
        <span>
          <h5>Contact List</h5>
          <Link to="/create">
            <img src={IconAdd} />
          </Link>
        </span>
        {dataContact.map((item, idx) => {
          return  (
            <Contact
              age={item.age}
              className={styles['contact-item']}
              deleteContact={deleteData}
              firstName={item.firstName}
              id={item.id}
              key={idx}
              lastName={item.lastName}
              photo={item.photo}
            />);
        })}
      </section>
    </div>
  );
}

export function Contact({ age, deleteContact, firstName, id, lastName, photo }) {
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const [open, setOpen] = useState(false);

  const _handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteContact(id));
  };

  const _closeDelete = () => {
    setOpenDelete(false);
    location.href = '/';
  };

  return (
    <section className={styles.contact} key={id}>
      <section className={styles['contact-summary']}>
        <img src={photo ? photo : ImageEmpty} />
        <p>{firstName}</p>
        <span className={styles.icon}>
          <img onClick={_handleDelete} src={IconDelete} />
          <img onClick={() => setOpen(!open)} src={IconArrow} />
        </span>

      </section>
      {open && (
        <section className={styles['contact-detail']}>
          <p>First Name : {firstName}</p>
          <p>Last Name : {lastName}</p>
          <p>Age : {age} year old</p>
        </section>
      )}
      <ModalDelete
        message="Are you sure want delete this contact?"
        onClick={_handleDelete}
        onClose={_closeDelete}
        open={openDelete}
      />
    </section>
  );
}

Contact.defaultProps = {
  age: 0,
  deleteContact: () => {},
  firstName: '',
  id: '',
  lastName: '',
  photo: '',
};

Contact.propTypes = {
  age: PropTypes.number,
  deleteContact: PropTypes.func,
  firstName: PropTypes.string,
  id: PropTypes.string,
  lastName: PropTypes.string,
  photo: PropTypes.string,
};
