import React from 'react'
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

function AdminHome() {
  // t - tõlkimiseks
  // i18n - keelevahetuseks
  const { t } = useTranslation();

  return (
    <div>
      <Button as={Link} to="/admin/shops" variant="primary">{t("admin.shops")}</Button>{' '}
      <Button as={Link} to="/admin/categories" variant="secondary">{t("admin.categories")}</Button>{' '}
      <Button as={Link} to="/admin/add" variant="success">{t("admin.add-product")}</Button>{' '}
      <Button as={Link} to="/admin/products" variant="warning">{t("admin.edit-delete-products")}</Button>{' '}
      <Button as={Link} to="/admin/supplier" variant="light">Tarnija tooted</Button>{' '}
    </div>
  )
}

export default AdminHome