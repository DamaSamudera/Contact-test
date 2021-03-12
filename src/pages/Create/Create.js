import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createContact } from '../Home/actions';
import Button from '../../components/fragment/Button';
import IconBack from '../../assets/ic-arrow-chevron-left.svg';
import ImageEmpty from '../../assets/empty.png';
import styles from './styles.scoped.css';

export default function Create() {
  const dispatch = useDispatch();

  const [age, setAge] = useState();
  const [first, setFirst] = useState();
  const [last, setLast] = useState();
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(ImageEmpty);
  const { isLoadingSubmit } = useSelector((s) => s.home);

  const _handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      age: age,
      firstName: first,
      lastName: last,
      photo: image,
    };

    dispatch(createContact(payload));
  };

  const _imagePreview = (event) => {
    const reader = new FileReader();
    const img = event.target.files[0];

    if (event.target.files && img) {
      if (img.size < 2097152) {
        reader.readAsDataURL(img);
        reader.onloadend = () => {
          setImage(reader.result);
        };
        setImagePreview(URL.createObjectURL(img));
      } else {
        alert('File anda harus kurang dari 2MB');
      }
    }
  };

  return (
    <section className={styles.root}>
      <header>
        <Link to="/">
          <img alt="close"
            className={styles.close}
            src={IconBack}
          />
          <p>Back</p>
        </Link>
        <h6>Create Contact Form</h6>
      </header>
      <form className={styles.form} onSubmit={_handleSubmit}>
        <article>
          <TextField
            label="First Name"
            name="firstName"
            onChange={(e) => setFirst(e.target.value)}
            placeholder="Input First Name" />
          <TextField
            label="Last Name"
            name="lastName"
            onChange={(e) => setLast(e.target.value)}
            placeholder="Input Last Name" />
          <TextField
            label="Age"
            name="age"
            onChange={(e) => setAge(e.target.value)}
            placeholder="Input age" />
        </article>
        <FormImage img={imagePreview} onChange={_imagePreview} />
        <span>
          <Button className={styles['btn-cancel']}>Cancel</Button>
          <Button className={styles['btn-delete']}>{ isLoadingSubmit ?  'Process...' : 'Submit'}</Button>
        </span>
      </form>
    </section>
  );
}

Create.defaultProps = {
  age: 0,
  deleteContact: () => {},
  firstName: '',
  id: '',
  lastName: '',
  photo: '',
};

Create.propTypes = {
  age: PropTypes.number,
  deleteContact: PropTypes.func,
  firstName: PropTypes.string,
  id: PropTypes.string,
  lastName: PropTypes.string,
  photo: PropTypes.string,
};

export function TextField({ label, name, onChange, placeholder }) {

  return (
    <div className={styles.textfield}>
      <p>{label}</p>
      <input
        className={styles.input}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

TextField.defaultProps = {
  label: '',
  name: '',
  onChange: () => {},
  placeholder: '',
};

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export function FormImage({ img, onChange }) {
  return (
    <figure className={styles['form-image']}>
      <img className={styles['image-preview']} id="imagePreview" src={img} />
      <span>
        <label className={styles['upload-image']}>
          Unggah Cover
          <input
            accept="image/png, image/jpeg, image/jpg"
            name="image"
            onChange={onChange}
            required
            type="file"
          />
        </label>
        <p>Maksimal 2 MB hanya file berformat .JPG, .JPEG, .PNG</p>
      </span>
    </figure>
  );
}

FormImage.defaultProps = {
  onChange: () => {},
};

FormImage.propTypes = {
  img: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

