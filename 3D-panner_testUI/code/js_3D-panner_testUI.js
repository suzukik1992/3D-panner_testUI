autowatch = 1;

mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

var w = this.box.rect[2] - this.box.rect[0];
var space = w / 8;
var h = w * 2 + space;
var baseImage;
var spImage_1;
var spImage_2;
var line_f = 2;
var line_c = 0.5;
var line_p = 0.5;
var scale = 1;

var r = w / 25;
var pos_x = w / 2;
var pos_y = w / 2;
var pos_z = h - w / 2;
var sw;

var pointerImage_1;
var pointerImage_2;

reset();
	
//set pointer from numBox
function list(){
	pos_x = arrayfromargs(arguments)[0] * w;
	pos_y = (1 - arrayfromargs(arguments)[1]) * w;
	pos_z = (1 - arrayfromargs(arguments)[2]) * w + w + space;
	setup_pointer();
}

function setup_base(){
	var baseMG = new MGraphics(w, h);
	
	//draw color rectangle
	baseMG.set_source_rgba(0.5, 0.5, 0.5, 0.2);
	baseMG.rectangle(line_f, line_f, w - line_f * 2, w -line_f * 2);
	baseMG.rectangle(line_f, w + space + line_f, w - line_f * 2, w -line_f * 2);
	
	baseMG.fill();
	
	//cross
	baseMG.set_line_width(line_c);
	baseMG.set_source_rgba(0, 0, 0, 1);
	
	//set y z 
	baseMG.move_to(w / 2, line_f * 2);
	baseMG.line_to(w / 2, w - line_f * 2);
	baseMG.move_to(w / 2, w + space + line_f * 2);
	baseMG.line_to(w / 2, h - line_f * 2);
	
	//set x x 
	baseMG.move_to(line_f * 2, w / 2);
	baseMG.line_to(w - line_f * 2, w / 2);
	baseMG.move_to(line_f *2, h - w / 2);
	baseMG.line_to(w - line_f * 2, h - w / 2);
	
	baseMG.stroke();
	
	//draw frame
	baseMG.set_line_width(line_f);
	baseMG.set_source_rgba(0, 0, 0, 1);
	
	baseMG.move_to(line_f, line_f);
	baseMG.line_to(w - line_f, line_f);
	baseMG.line_to(w - line_f, w - line_f);
	baseMG.line_to(line_f, w - line_f);
	baseMG.line_to(line_f, line_f);
	
	baseMG.move_to(line_f, h - w);
	baseMG.line_to(w - line_f, h - w);
	baseMG.line_to(w - line_f, h - line_f);
	baseMG.line_to(line_f, h - line_f);
	baseMG.line_to(line_f, h - w);
	
	baseMG.stroke();
	baseImage = new Image(baseMG);
}

function setup_pointer(){
	var pointerMG_1 = new MGraphics(w, w - line_f);
	var pointerMG_2 = new MGraphics(w, w - line_f);
	repeatSw = 0;
	
	//draw pointer
	pointerMG_1.set_source_rgba(1, 0, 0, 0.9);
	pointerMG_2.set_source_rgba(1, 0, 0, 0.9);
	pointerMG_1.arc(pos_x, pos_y, r, 0, Math.PI * 2);
	pointerMG_2.arc(pos_x, pos_z - (w + space), r, 0, Math.PI * 2);

	pointerMG_1.fill();
	pointerMG_2.fill();
	
	pointerImage_1 = new Image(pointerMG_1);
	pointerImage_2 = new Image(pointerMG_2);
	
	mgraphics.redraw();
}

function setup_sp(){
	var spMG_1 = new MGraphics(w, w);
	var spMG_2 = new MGraphics(w, w);
	
	//draw pointer circle
	spMG_1.set_source_rgba(0.5, 0.5, 0.5, 0.5);	
	spMG_1.arc(w / 2, w / 2, w / 2, 0, Math.PI * 2);
	spMG_1.arc(w / 2, w / 2, 3 * w / 8, 0, Math.PI * 2);
	spMG_1.arc(w / 2, w / 2, w / 4, 0, Math.PI * 2);
	spMG_1.arc(w / 2, w / 2, w / 8, 0, Math.PI * 2);
	spMG_1.stroke();
	spImage_1 = new Image(spMG_1);
	
	spMG_2.set_source_rgba(0.5, 0.5, 0.5, 0.5);	
	spMG_2.arc(w / 2, w / 2, w / 2, 0, Math.PI * 2);
	spMG_2.arc(w / 2, w / 2, 3 * w / 8, 0, Math.PI * 2);
	spMG_2.arc(w / 2, w / 2, w / 4, 0, Math.PI * 2);
	spMG_2.arc(w / 2, w / 2, w / 8, 0, Math.PI * 2);
	spMG_2.stroke();
	spImage_2 = new Image(spMG_2);
	
	mgraphics.redraw();
}

function onclick(x, y){
	//which xy or xz
	if(0 < y && y < w){
		pos_x = x;
		pos_y = y;
		sw = 0;
	}
	else if(w+space < y && y < h){
		pos_x = x;
		pos_z = y;
		sw = 1;
	}	
	setup_pointer();
}

function ondrag(x, y){
	if(sw == 0){
		pos_x = clip(0, w, x);
		pos_y = clip(0, w, y);
	}
	else{
		pos_x = clip(0, w, x);
		pos_z = clip(h - w, h ,y);
	}
	setup_pointer();
}

function paint(){
	//paste paste paste
	mgraphics.image_surface_draw(baseImage);
	
	mgraphics.image_surface_draw(spImage_1);
	mgraphics.image_surface_draw(pointerImage_1);
	mgraphics.translate(0, h - w);
	mgraphics.image_surface_draw(spImage_2);
	mgraphics.image_surface_draw(pointerImage_2);
	mgraphics.identity_matrix();
	
	mgraphics.set_line_width(1.5);
	mgraphics.set_source_rgba(1, 0, 0, 0.85);
	mgraphics.move_to(pos_x, pos_y);
	mgraphics.line_to(pos_x, pos_z);
	mgraphics.stroke();
	
	//output coordinate
	outlet(0, pos_x / w, 1 - (pos_y / w), 1 - (pos_z -w - space) / w);	
}

function reset(){
	setup_base();
	setup_sp();
	mgraphics.redraw();
	setup_pointer();
}

function clip(Min, Max, val){
	if(val < Min) return Min;
	else if(val > Max) return Max;
	return val;
}