/* global app */
{
    const {openModal, closeModal} = app;
    const {getUiElements, applyStylesheet, getParentElementWithClass} = app.util;

    const customCssPlaceholder = [
        '/* no transparent windows */',
        '.window .window-top-nav, .window .window-middle, .window .window-bottom {',
        '    background: rgba(255, 255, 255, 1.0);',
        '}'
    ].join('\n');

    const content = document.createElement('div');
    content.innerHTML = `
        <div class="optionsModal">
            <div class="optionsTabs" data-id="tabs">
                <div class="optionsTabStartFiller"></div>
                <div class="optionsTab currentTab" data-id="optionsTab" data-page="optionsPage">Options</div>
                <div class="optionsTab" data-id="helpTab" data-page="helpPage">Help</div>
                <div class="optionsTab" data-id="aboutTab" data-page="aboutPage">About</div>
                <div class="optionsTabsFiller"></div>
            </div>
            <div class="tabPages">
                <div class="tabPage currentPage" data-id="optionsPage">
                    <div class="option">
                        <div class="optionText">Remember opened folder and document windows:</div>
                        <div class="optionUi">
                            <input type="checkbox" data-id="rememberWindows">
                        </div>
                    </div>
                    <div class="option">
                        <div class="optionText">Window close button on right:</div>
                        <div class="optionUi">
                            <input type="checkbox" data-id="windowCloseRight">
                        </div>
                    </div>
                    <div class="option">
                        <div class="textareaContainer">
                            <div class="label">Custom Styles (CSS):</div>
                            <div>
                                <textarea data-id="customCss" placeholder="${customCssPlaceholder}"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tabPage" data-id="helpPage">
                    ${app.helpMarkup}
                </div>
                <div class="tabPage" data-id="aboutPage">
                    <h3>Super Bookmark Desktop v1.0.0</h3>
                    <div>&copy; Kyle Paulsen (2017)</div><br>
                    <div>
                        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                        <input type="hidden" name="cmd" value="_s-xclick">
                        <input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
                        ">
                        <div style="display: flex">
                            <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">
                            <div style="font-size: 20px; margin-left: 10px;">Like this extension? Please buy me food! &#x1F35C</div>
                        </div>
                        <img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
                        </form>
                    </div>
                    <div class="backgroundImageAttributions">
                        <div><b>Background Image Attributions</b></div>
                        <div>All default background images are &copy; Kyle Paulsen except for the ones listed below:</div>
                        <div class="imageAttribution">
                            <div class="imageAttributionImg"><img src="backgrounds/aurora-borealis.png"></div>
                            <div class="imageAttributionText">
                                <div>
                                    aurora-borealis.png is by janeb13
                                    <a href="https://pixabay.com/en/aurora-borealis-alaska-space-1181004/">
                                        https://pixabay.com/en/aurora-borealis-alaska-space-1181004/
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="imageAttribution">
                            <div class="imageAttributionImg"><img src="backgrounds/clouds.png"></div>
                            <div class="imageAttributionText">
                                <div>
                                    clouds.png is by carloyuen
                                    <a href="https://pixabay.com/en/clouds-mist-a-surname-mountain-2517653/">
                                        https://pixabay.com/en/clouds-mist-a-surname-mountain-2517653/
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="imageAttribution">
                            <div class="imageAttributionImg"><img src="backgrounds/micro.png"></div>
                            <div class="imageAttributionText">
                                <div>
                                    micro.png is by Max Strater
                                    <a href="http://www.maxstrater.com/">http://www.maxstrater.com/</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <button class="btn" data-id="closeBtn">Close</button>
            </div>
        </div>
    `;
    const ui = getUiElements(content);
    let modalOpen = false;

    const close = () => {
        closeModal();
        modalOpen = false;
    };

    const showTab = (tab) => {
        document.querySelectorAll('.optionsTab').forEach((tab) => {
            tab.classList.remove('currentTab');
        });
        document.querySelectorAll('.tabPage').forEach((page) => {
            page.classList.remove('currentPage');
        });
        tab.classList.add('currentTab');
        ui[tab.dataset.page].classList.add('currentPage');
    };

    ui.tabs.addEventListener('click', (e) => {
        const tab = getParentElementWithClass(e.target, 'optionsTab');
        if (tab) {
            showTab(tab);
        }
    });
    ui.closeBtn.addEventListener('click', close);

    ui.rememberWindows.addEventListener('change', () => {
        if (ui.rememberWindows.checked) {
            localStorage.rememberWindows = '1';
            app.rememberOpenWindows();
        } else {
            localStorage.rememberWindows = '';
            localStorage.openedWindows = '';
        }
    });
    if (localStorage.rememberWindows) {
        ui.rememberWindows.checked = true;
    }
    app.rememberOpenWindows = () => {
        if (localStorage.rememberWindows) {
            let windowEls = document.querySelectorAll('.window');
            const activeWin = document.querySelector('.window.active');
            if (activeWin) {
                // make the active window last so it shows up in front.
                windowEls = windowEls.filter((win) => !win.classList.contains('active'));
                windowEls.push(activeWin);
            }
            const windows = windowEls.map((win) => {
                return {
                    x: win.offsetLeft,
                    y: win.offsetTop,
                    width: win.offsetWidth,
                    height: win.offsetHeight,
                    id: win.dataset.id,
                    type: win.dataset.document ? 'document' : 'folder'
                };
            });
            localStorage.openedWindows = JSON.stringify(windows);
        } else {
            localStorage.openedWindows = '';
        }
    };

    const reopenWindows = async () => {
        const openedWindows = JSON.parse(localStorage.openedWindows || '[]');
        for (let x = 0; x < openedWindows.length; x++) {
            const win = openedWindows[x];
            if (win.type === 'document') {
                await app.editDocument(win.id, win);
            } else if (win.type === 'folder') {
                await app.openFolder(win.id, null, win);
            }
        }
    };
    reopenWindows();

    ui.windowCloseRight.addEventListener('change', () => {
        if (ui.windowCloseRight.checked) {
            applyStylesheet('.title-bar{flex-direction: row-reverse;}', 'windowCloseRight');
            localStorage.windowCloseRight = '1';
        } else {
            applyStylesheet('.title-bar{flex-direction: row;}', 'windowCloseRight');
            localStorage.windowCloseRight = '';
        }
    });
    if (localStorage.windowCloseRight) {
        applyStylesheet('.title-bar{flex-direction: row-reverse;}', 'windowCloseRight');
        ui.windowCloseRight.checked = true;
    }

    ui.customCss.addEventListener('change', () => {
        applyStylesheet(ui.customCss.value, 'userStyles');
        localStorage.userStyles = ui.customCss.value;
    });
    applyStylesheet(localStorage.userStyles || '', 'userStyles');

    window.addEventListener('keydown', function(e) {
        if (modalOpen) {
            if (e.keyCode === 13 || e.keyCode === 27) { // enter or esc
                const focusedEl = document.activeElement;
                if (focusedEl.tagName === 'INPUT') {
                    focusedEl.blur();
                } else if (focusedEl.tagName !== 'TEXTAREA') {
                    close();
                }
            }
        }
    });

    app.openOptions = () => {
        openModal(content);
        modalOpen = true;
    };
}