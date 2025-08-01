document.addEventListener('DOMContentLoaded', () => {
    // 弹窗控制模块
    const settingsModal = document.getElementById('settingsModal');
    const maskLayer = document.getElementById('mask');

    // 模式切换处理（保留唯一的事件监听器）
    document.getElementById('mode').addEventListener('change', function (e) {
        const value = e.target.value;
        const interfaces = document.querySelectorAll('.interface');

        if (value === 'settings') {
            openSettings();
            this.value = 'default';
            return;
        }

        interfaces.forEach(ui => ui.style.display = 'none');
        document.getElementById(value).style.display = 'block';
    });

    // 全局状态管理
    window.appState = {
        totalStudents: 52,
        isFlickering: false,
        intervalId: null,
        fast: 50
    };

    // 下载源代码功能
    async function downloadSourceCode() {
        const zip = new JSZip();
        const htmlContent = `<!DOCTYPE html>\n${document.documentElement.outerHTML}`;
        zip.file("抽学号.html", htmlContent);

        const fileContents = {
            'DrawStudentID.css': 'body { font-family: \'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; margin: 0; padding: 20px; }',
            'Setting.css': '.modal-mask { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999; }',
            'DrawStudentID.js': '// 全局状态管理\nlet appState = { totalStudents: 52, isFlickering: false, intervalId: null };',
            'Setting.js': '// 弹窗控制模块\nconst settingsModal = document.getElementById(\'settingsModal\');',
        };

        for (const [filename, content] of Object.entries(fileContents)) {
            zip.file(filename, content);
        }

        const blob = await zip.generateAsync({ type: "blob" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "抽学号系统源码.zip";
        link.click();
        URL.revokeObjectURL(link.href);
    }

    // 打开设置
    function openSettings() {
        maskLayer.style.display = 'block';
        settingsModal.style.display = 'block';
        document.getElementById('totalStudents').value = window.appState.totalStudents;
        document.getElementById('fast').value = window.appState.fast;
    }

    // 关闭设置
    function closeSettings() {
        maskLayer.style.display = 'none';
        settingsModal.style.display = 'none';
    }

    // 保存设置
    function saveSettings() {
        const newTotal = parseInt(document.getElementById('totalStudents').value);
        const newFast = parseInt(document.getElementById('fast').value);

        if (newTotal > 0 && newFast > 0 || newTotal <= 1000000000) {
            window.appState.totalStudents = newTotal;
            window.appState.fast = newFast;
            updateStudentCounters();
            closeSettings();
        } else {
            if (newTotal <= 0 || newTotal > 1000000000){
                alert('请输入有效的班级人数！');
            } else if (newFast <= 0 || newFast > 1000000000) {
                alert('请输入有效的闪烁速度！');
            }
        }
    }

    // 全局暴露函数
    window.closeSettings = closeSettings;
    window.saveSettings = saveSettings;
    window.downloadSourceCode = downloadSourceCode;
    window.openSettings = openSettings;
});
