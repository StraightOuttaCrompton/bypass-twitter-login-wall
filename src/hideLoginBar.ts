export default function hideLoginBar() {
    const xpath = "//span[text()='Don’t miss what’s happening']";
    const matchingElement = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    const loginBar =
        matchingElement!.parentElement!.parentElement!.parentElement!.parentElement!.parentElement!.parentElement!
            .parentElement;

    if (!loginBar) return;

    loginBar.style.display = 'none';
}
