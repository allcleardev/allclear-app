const defaultShareError = { error: 'An error occured. Unable to Share at this time' };
const defaultShareSuccess = {
  success: true,
  message: 'Link Copied to Clipboard!',
};

export async function triggerShareAction({
  title = 'AllClear',
  url = 'https://go.allclear.app',
  text = document.querySelector('meta[name="description"]') &&
  document.querySelector('meta[name="description"]').content,
} = {}) {
  if (navigator && navigator.share) {
    // safari browser + safari ios + chrome android
    return navigator
      .share({ title, url, text })
      .then((response) => {
        return { success: true, message: 'Shared Successfully!' };
      })
      .catch((error) => {
        console.error('Navigator share error:', error);
        return { error: 'Share Cancelled' };
      });
  } else if (navigator && navigator.clipboard) {
    // modern browsers
    return navigator.clipboard
      .writeText(url)
      .then(() => defaultShareSuccess)
      .catch((error) => {
        console.error('Navigator clipboard error:', error);
        return defaultShareError;
      });
  } else if (window.clipboardData) {
    // ie
    window.clipboardData
      .setData('text', url)
      .then(() => defaultShareSuccess)
      .catch((error) => {
        console.error('Window clipboard error:', error);
        return defaultShareError;
      });
  } else {
    // final fallback
    return _fallbackShareAction(url);
  }
}

function _fallbackShareAction(copyText) {
  // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
  const textArea = document.createElement('textarea');
  textArea.value = copyText;
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (error) {
    console.error('Fallback share action unable to copy', error);
    return defaultShareError;
  }
  document.body.removeChild(textArea);
  return defaultShareSuccess;
}

export function getShareActionSnackbar(shareActionResponse) {
  const response = shareActionResponse;
  let snackbarMessage;
  let snackbarSeverity;

  if (response.success) {
    snackbarMessage = response.message;
    snackbarSeverity = 'success';
  } else if (response.error) {
    snackbarMessage = response.error;
    snackbarSeverity = 'warning';
  } else {
    snackbarMessage = 'An error occured. Please try again later';
    snackbarSeverity = 'error';
  }
  return { snackbarMessage, snackbarSeverity };
}