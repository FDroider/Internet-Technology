import { LAB_APPLICATIONS } from './data.js';
import {
    state,
    initState,
    recordLabTransition
} from './state.js';
import { validateLabUrl } from './utils.js';
import {
    showStatusBanner,
    hideStatusBanner,
    renderCatalog,
    openLabViewer,
    closeLabViewer,
    renderHistoryModal
} from './ui.js';

$(function () {
    initState();
    renderCatalog();

    function launchLabInWindow(labId) {
        const labItem = LAB_APPLICATIONS.find(item => item.id === labId);
        if (!labItem) return;

        const urlCheck = validateLabUrl(labItem.url);
        if (!urlCheck.isValid) {
            showStatusBanner('error', urlCheck.message);
            return;
        }

        hideStatusBanner();
        state.currentLabId = labItem.id;
        recordLabTransition(labItem);
        openLabViewer(labItem);
    }

    $('#labs-grid').on('click', '.btn-open-embedded', function () {
        const labId = $(this).attr('data-lab-id');
        launchLabInWindow(labId);
    });

    $('#labs-grid').on('click', '.btn-open-external', function () {
        const labId = $(this).attr('data-lab-id');
        const labItem = LAB_APPLICATIONS.find(item => item.id === labId);
        if (labItem) {
            recordLabTransition(labItem);
        }
    });

    $('#back-to-menu-btn').on('click', function () {
        state.currentLabId = null;
        closeLabViewer();
    });

    $('.viewer-switch-btn').on('click', function () {
        const labId = $(this).attr('data-lab-id');
        launchLabInWindow(labId);
    });

    $('#open-history-btn').on('click', function () {
        renderHistoryModal(state.history);
        $('#history-modal').fadeIn(200);
    });

    $('#close-history-btn').on('click', function () {
        $('#history-modal').fadeOut(180);
    });

    $('.modal-overlay').on('click', function (event) {
        if ($(event.target).hasClass('modal-overlay')) {
            $(this).fadeOut(180);
        }
    });
});
