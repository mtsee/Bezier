import bezier from './bezier';

$(function() {
    const p1 = [0, 0];
    const p2 = [1000, 600];
    const c1 = [1000, 0];
    const c2 = [0, 600];

    // 一阶贝塞尔
    const dotNumber = 50;
    let shtml = '';
    bezier.getBezierPoints(dotNumber, p1, p2).forEach(d => {
        d = d.map(e => parseInt(e, 10));
        shtml += `<span style="left: ${d[0]}px; top: ${d[1]}px;" class="dot">${d.join(',')}</span>`;
    });
    $('#oneBezier').html(shtml);

    shtml = '';
    bezier.getBezierPoints(dotNumber, p1, c1, p2).forEach(d => {
        d = d.map(e => parseInt(e, 10));
        shtml += `<span style="left: ${d[0]}px; top: ${d[1]}px;" class="dot">${d.join(',')}</span>`;
    });
    $('#twoBezier').html(shtml);

    shtml = '';
    bezier.getBezierPoints(dotNumber, p1, c1, c2, p2).forEach(d => {
        d = d.map(e => parseInt(e, 10));
        shtml += `<span style="left: ${d[0]}px; top: ${d[1]}px;" class="dot">${d.join(',')}</span>`;
    });
    $('#threeBezier').html(shtml);
});
