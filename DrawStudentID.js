// // 全局状态管理
// let appState = {
//     totalStudents: 52,
//     isFlickering: false,
//     intervalId: null,
//     fast: 50
// };

// // 初始化界面
// function initInterface() {
//     document.getElementById('default').style.display = 'block';
//     updateStudentCounters();
// }

// // 更新人数显示
// function updateStudentCounters() {
//     document.querySelectorAll('#currentTotal, #flickerTotal').forEach(el => {
//         el.textContent = appState.totalStudents;
//     });
// }

// // 默认抽号处理
// function handleDefaultDraw() {
//     const result = Math.floor(Math.random() * appState.totalStudents) + 1;
//     document.getElementById('DefaultResult').innerHTML = `
//         🎉 抽中学号：<span class="highlight">${result}</span>
//     `;
// }

// // 闪烁抽号处理
// function handleFlickerDraw() {
//     const btn = document.getElementById('flickerBtn');
//     if (!appState.isFlickering) {
//         appState.isFlickering = true;
//         btn.innerHTML = '⏸️ 暂停闪烁';
//         appState.intervalId = setInterval(() => {
//             const tempResult = Math.floor(Math.random() * appState.totalStudents) + 1;
//             document.getElementById('FlickerResult').innerHTML = `
//                 ✨ 闪烁中：<span class="blink">${tempResult}</span>
//             `;
//         }, appState.fast);
//     } else {
//         appState.isFlickering = false;
//         btn.innerHTML = '▶️ 开始闪烁';
//         clearInterval(appState.intervalId);
//     }
// }

// // 初始化
// document.addEventListener('DOMContentLoaded', initInterface);
document.addEventListener('DOMContentLoaded', () => {
    // 更新人数显示
    function updateStudentCounters() {
        document.querySelectorAll('#currentTotal, #flickerTotal').forEach(el => {
            el.textContent = window.appState.totalStudents;
        });
    }

    // 默认抽号处理
    function handleDefaultDraw() {
        const result = Math.floor(Math.random() * window.appState.totalStudents) + 1;
        document.getElementById('DefaultResult').innerHTML = `
            🎉 抽中学号：<span class="highlight">${result}</span>
        `;
    }

    // 闪烁抽号处理
    function handleFlickerDraw() {
        const btn = document.getElementById('flickerBtn');
        if (!window.appState.isFlickering) {
            window.appState.isFlickering = true;
            btn.innerHTML = '⏸️ 暂停闪烁';
            window.appState.intervalId = setInterval(() => {
                const tempResult = Math.floor(Math.random() * window.appState.totalStudents) + 1;
                document.getElementById('FlickerResult').innerHTML = `
                    ✨ 闪烁中：<span class="blink">${tempResult}</span>
                `;
            }, window.appState.fast);
        } else {
            window.appState.isFlickering = false;
            btn.innerHTML = '▶️ 开始闪烁';
            clearInterval(window.appState.intervalId);
        }
    }

    // 初始化界面
    function initInterface() {
        document.getElementById('default').style.display = 'block';
        updateStudentCounters();
    }

    // 全局暴露函数
    window.updateStudentCounters = updateStudentCounters;
    window.handleDefaultDraw = handleDefaultDraw;
    window.handleFlickerDraw = handleFlickerDraw;

    // 初始化
    initInterface();
});
