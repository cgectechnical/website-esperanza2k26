import Swal from "sweetalert2";

export const customSwal = Swal.mixin({
  customClass: {
    container: 'swal-container',
    popup: 'swal-popup',
    title: 'swal-title',
    closeButton: 'swal-close-button',
    icon: 'swal-icon',
    image: 'swal-image',
    htmlContainer: 'swal-html-container',
    input: 'swal-input',
    inputLabel: 'swal-input-label',
    validationMessage: 'swal-validation-message',
    actions: 'swal-actions',
    confirmButton: 'swal-confirm-button',
    denyButton: 'swal-deny-button',
    cancelButton: 'swal-cancel-button',
    loader: 'swal-loader',
    footer: 'swal-footer'
  },
  background: 'linear-gradient(135deg, #0F0207 0%, #1a0b0e 50%, #0F0207 100%)',
  color: '#ffffff',
  confirmButtonColor: '#dc2626',
  cancelButtonColor: '#374151',
  backdrop: 'rgba(0, 0, 0, 0.85)',
});

export default customSwal;
