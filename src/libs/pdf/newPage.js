const newPage = (doc, startY, neededHeight) => {
    const pageHeight = doc.internal.pageSize.height;
	// const pageWidth = doc.internal.pageSize.width;
	// const pageCenterX = pageWidth / 2;
    const endY = pageHeight 
    const newPageY = 40;

    if (endY - startY - neededHeight < 0) {
        
        doc.addPage();

        // const bgSvg = doc.vars.bgImage;
        // if (bgSvg) {
        //     const svgText = new window.DOMParser().parseFromString(bgSvg, "text/xml");
        //     const svg = svgText.getElementsByTagName('svg')[0];

        //     await doc.svg(svg, {
        //         x: pageCenterX - doc.vars.bgImageWidth / 2,
        //         y: 25
        //     });
        // }

        return newPageY;
    }
    return startY;
};

export default newPage