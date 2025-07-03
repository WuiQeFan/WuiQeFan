// [file name]: Setting.js
// 全局变量
let currentPreviewFile = '抽学号.html';
const fileContents = {
    'DrawStudentID.css': document.querySelector('link[href="DrawStudentID.css"]').outerHTML,
    'Setting.css': document.querySelector('link[href="Setting.css"]').outerHTML,
    'DrawStudentID.js': document.querySelector('script[src="DrawStudentID.js"]').outerHTML,
    'Setting.js': document.querySelector('script[src="Setting.js"]').outerHTML
};

// 下载入口函数
async function downloadSourceCode() {
    openCodePreview();
}

// 代码预览功能
function openCodePreview() {
    document.getElementById('mask').style.display = 'block';
    document.getElementById('codePreviewModal').style.display = 'block';
    renderFileTree();
    loadFileContent(currentPreviewFile);
}

function closeCodePreview() {
    document.getElementById('mask').style.display = 'none';
    document.getElementById('codePreviewModal').style.display = 'none';
}

function renderFileTree() {
    const fileTree = document.getElementById('fileTree');
    fileTree.innerHTML = Object.keys(fileContents)
        .map(file => `<div class="file-item ${file === currentPreviewFile ? 'active' : ''}" 
                       onclick="loadFileContent('${file}')">📄 ${file}</div>`)
        .join('');
}

function loadFileContent(filename) {
    currentPreviewFile = filename;
    const content = filename === '抽学号.html' ? 
        `<!DOCTYPE html>\n${document.documentElement.outerHTML}` : 
        fileContents[filename];
    document.getElementById('codeContent').textContent = content;
    renderFileTree();
}

// 下载选项功能
function showDownloadOptions() {
    document.getElementById('downloadOptionsModal').style.display = 'block';
}

function closeDownloadOptions() {
    document.getElementById('downloadOptionsModal').style.display = 'none';
}

// 下载实现
async function downloadAsZip() {
    const zip = new JSZip();
    
    // 添加当前HTML
    zip.file("抽学号.html", `<!DOCTYPE html>\n${document.documentElement.outerHTML}`);
    
    // 添加其他文件
    for (const [filename, content] of Object.entries(fileContents)) {
        zip.file(filename, content);
    }
    
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, "抽学号系统源码.zip");
    closeDownloadOptions();
}

async function downloadAsFolder() {
    try {
        const handle = await window.showDirectoryPicker();
        
        // 保存主HTML文件
        const htmlHandle = await handle.getFileHandle("抽学号.html", { create: true });
        const htmlWritable = await htmlHandle.createWritable();
        await htmlWritable.write(`<!DOCTYPE html>\n${document.documentElement.outerHTML}`);
        await htmlWritable.close();
        
        // 保存其他文件
        for (const [filename, content] of Object.entries(fileContents)) {
            const fileHandle = await handle.getFileHandle(filename, { create: true });
            const writable = await fileHandle.createWritable();
            await writable.write(content);
            await writable.close();
        }
        
        alert('保存成功！请在选择的文件夹中查看文件');
    } catch (err) {
        if (err.name !== 'AbortError') {
            alert('错误：' + err.message + '\n请使用最新版Chrome浏览器');
        }
    }
    closeDownloadOptions();
}

// 暴露函数到全局
window.closeCodePreview = closeCodePreview;
window.showDownloadOptions = showDownloadOptions;
window.closeDownloadOptions = closeDownloadOptions;
window.downloadAsZip = downloadAsZip;
window.downloadAsFolder = downloadAsFolder;