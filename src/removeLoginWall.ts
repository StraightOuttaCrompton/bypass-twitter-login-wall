import applyStyles from './utils/applyStyles';

function getDialogElements() {
    const layerElements = Array.from(document.querySelectorAll('#layers > div'));
    return layerElements
        .map((element) => Array.from(element.querySelectorAll(':scope > div > div > div[role="dialog"]')))
        .flat()
        .filter((element) => {
            const imageElement = element.querySelector(
                ':scope > div > div > div[role="group"] > div[aria-modal="true"][aria-labelledby="modal-header"][role="dialog"]'
            );
            return imageElement === null;
        });
}

function getLoginDialog() {
    const dialogElements = getDialogElements();
    return dialogElements[0]!.parentElement!.parentElement!.parentElement;
}

function fixScrolling() {
    const htmlElement = document.querySelector('html');
    const isImageDetailPage = document.location.href.match(/\/status\/.*\/photo\//);
    applyStyles(htmlElement, {
        overflow: isImageDetailPage ? 'hidden' : 'auto scroll',
        overscrollBehaviorY: isImageDetailPage ? 'none' : '',
        marginRight: '',
    });
}

export default function removeLoginWall() {
    const loginDialog = getLoginDialog();
    if (!loginDialog) return;

    // Hide login dialog
    loginDialog.style.display = 'none';

    fixScrolling();
}
