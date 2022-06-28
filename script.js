{
  const selector = {
    title: 'js-issue-title markdown-title',
    linesAdded: '#diffstat > span.color-fg-success',
    linesRemoved: '#diffstat > span.color-fg-danger',
    branch: 'span.commit-ref.css-truncate.user-select-contain.expandable.head-ref > a > span'
  };

  const pullRequestTitle = document.getElementsByClassName(selector.title)[0].textContent.trim();
  const pullRequestUrl = window.location.href;
  const linesAdded = document.querySelector(selector.linesAdded).textContent.trim();
  const linesRemoved = document.querySelector(selector.linesRemoved).textContent.trim();
  const branchName = document.querySelector(selector.branch).textContent.trim();

  const formatDiff = (added, removed) => `(${added},${removed})`;

  const textToCopy = `${pullRequestTitle} ${formatDiff(linesAdded, linesRemoved)}\n${pullRequestUrl}\n${branchName}`;

  const copyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    // Place in the top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of the white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
  }

  copyTextToClipboard(textToCopy);
}