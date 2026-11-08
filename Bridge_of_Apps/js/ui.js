import { LAB_APPLICATIONS } from './data.js';

export function showStatusBanner(type, message) {
    const $banner = $('#status-banner');
    $banner
        .removeClass('banner-success banner-error')
        .addClass(type === 'success' ? 'banner-success' : 'banner-error')
        .text(message)
        .stop(true, true)
        .fadeIn(180);
}

export function hideStatusBanner() {
    $('#status-banner').stop(true, true).fadeOut(140);
}

export function renderCatalog() {
    const $grid = $('#labs-grid').empty();

    $.each(LAB_APPLICATIONS, (_, lab) => {
        const $tagsWrap = $('<div>').addClass('lab-tags d-flex flex-wrap gap-2 mb-3');
        $.each(lab.tags, (__, tagText) => {
            $tagsWrap.append($('<span>').addClass('badge fw-normal px-2 py-1 tag-item').text(tagText));
        });

        const $cardTop = $('<div>')
            .addClass('lab-card-top d-flex justify-content-between align-items-center mb-3')
            .append(
                $('<span>').addClass(`badge rounded-pill px-3 py-2 lab-badge ${lab.badgeClass}`).text(lab.badgeText),
                $('<span>').addClass('lab-category small').text(lab.category)
            );

        const $cardBody = $('<div>').append(
            $cardTop,
            $('<h3>').addClass('lab-title h5 fw-bold mb-1').text(lab.title),
            $('<p>').addClass('lab-subtitle small fw-medium mb-2').text(lab.subtitle),
            $('<p>').addClass('lab-desc mb-3').text(lab.description),
            $tagsWrap
        );

        const $openInWindowBtn = $('<button>')
            .attr('type', 'button')
            .attr('data-lab-id', lab.id)
            .addClass('btn btn-portal-primary w-100 fw-semibold py-2 btn-open-embedded')
            .text(`Відкрити ${lab.badgeText}`);

        const $openNewTabBtn = $('<a>')
            .attr({
                href: lab.url,
                target: '_blank',
                rel: 'noopener noreferrer',
                'data-lab-id': lab.id
            })
            .addClass('btn btn-portal-secondary w-100 py-2 btn-open-external text-center')
            .text('Відкрити у новій вкладці ↗');

        const $cardFooter = $('<div>')
            .addClass('lab-card-footer pt-3 mt-auto d-flex flex-column gap-2')
            .append($openInWindowBtn, $openNewTabBtn);

        const $card = $('<article>')
            .addClass('card lab-card h-100 p-4 rounded-4 d-flex flex-column justify-content-between')
            .append($cardBody, $cardFooter);

        const $col = $('<div>').addClass('col-12 col-md-6 col-xl-3').append($card);

        $grid.append($col);
    });
}

export function openLabViewer(labItem) {
    const badgeClasses = 'lab-7 lab-8 lab-9 lab-10';

    $('#viewer-lab-badge')
        .removeClass(badgeClasses)
        .addClass(labItem.badgeClass)
        .text(labItem.badgeText);

    $('#viewer-lab-title').text(labItem.title);
    $('#viewer-external-link').attr('href', labItem.url);

    $('.viewer-switch-btn').removeClass('active');
    $(`.viewer-switch-btn[data-lab-id="${labItem.id}"]`).addClass('active');

    $('#lab-iframe').attr('src', labItem.url);

    $('#main-menu-view').fadeOut(180, function () {
        $('#lab-viewer-section').fadeIn(220);
    });
}

export function closeLabViewer() {
    $('#lab-viewer-section').fadeOut(180, function () {
        $('#lab-iframe').attr('src', 'about:blank');
        $('#main-menu-view').fadeIn(220);
    });
}

export function renderHistoryModal(historyList) {
    const $tbody = $('#history-table-body').empty();

    if (!historyList || historyList.length === 0) {
        const $emptyRow = $('<tr>').append(
            $('<td>')
                .attr('colspan', 3)
                .addClass('text-center py-3')
                .text('Історія переходів поки що порожня.')
        );
        $tbody.append($emptyRow);
        return;
    }

    $.each(historyList, (_, item) => {
        const $row = $('<tr>').append(
            $('<td>').addClass('px-3 py-2').text(item.timestamp),
            $('<td>').addClass('px-3 py-2').text(`${item.labBadge}: ${item.labTitle}`),
            $('<td>').addClass('px-3 py-2').text(item.url)
        );
        $tbody.append($row);
    });
}
