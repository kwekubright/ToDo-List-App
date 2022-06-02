export class Alert {
  // Show success alert
   static showSuccess = (msg) => {
     const success = document.getElementById('alert-success');
     success.innerHTML = msg;
    setTimeout(() => {
      success.classList.remove('hide');
    }, 100);
    setTimeout(() => {
      success.classList.add('hide');
    }, 3000);
  }

  // Show error alert
  static showError = () => {
    const error = document.getElementById('alert-error');
    setTimeout(() => {
      error.classList.remove('hide');
    }, 100);
    setTimeout(() => {
      error.classList.add('hide');
    }, 3000);
  }
}