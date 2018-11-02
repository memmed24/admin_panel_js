
//variables
let createbtn = document.getElementById('createButton');
let pagination = document.getElementById('pagination');
let current_page = 1;
let url = "http://localhost:8000/";
var whole_pages = 0;


//events
// createbtn.addEventListener('click', projectCreate);
window.onload = windowLoad();

//functions


function windowLoad() {

	let href = window.location.href;

	switch (href) {
		case `${url}admin`:
			adminIndex();
			break;
		case `${url}admin/projects`:
			loadAllProjects(current_page);
			break;
		case `${url}admin/partners`:
			loadAllPartners(current_page);
			break;
		case `${url}admin/partners#`:
			loadAllPartners(current_page);
			break;
		case `${url}admin/sliders`:
			loadAllSliders(current_page);
			break;
		case `${url}admin/sliders#`:
			loadAllSliders(current_page);
			break;
		case `${url}admin/designos`:
			loadAll('designos');
			break;
		case `${url}admin/designos#`:
			loadAll('designos');
			break;
		// case `${url}admin/portfolios`:
		// 	loadAll('portfolios');
		// break;
		// case `${url}admin/portfolios#`:
		// 	loadAll('portfolios');
		// break;

	}
}



// admin index - = - = - = - = - = - = - = - = 
function weekly() {
	return new Promise(resolve => {

		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});

		$.ajax({
			method: 'GET',
			url: `${url}admin/weekly`,
			success: (data) => {
				resolve(data);
			}
		});

	});
}

function daily() {
	return new Promise(resolve => {
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});

		$.ajax({
			method: 'GET',
			url: `${url}admin/daily`,
			success: (data) => {
				resolve(data);
			}
		});
	});
}

function monthly() {
	return new Promise(resolve => {
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});

		$.ajax({
			method: 'GET',
			url: `${url}admin/monthly`,
			success: (data) => {
				resolve(data);
			}
		});
	});
}

function annual() {
	return new Promise(resolve => {
		$.ajaxSetup({
			headers: {
				'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
			}
		});

		$.ajax({
			method: 'GET',
			url: `${url}admin/annual`,
			success: (data) => {
				resolve(data);
			}
		});
	});
}

// whole_count

function widgetChart4(response) {
	let daily = document.getElementById("daily");
	daily.innerHTML = response['data']['count'];
	// var ctx = document.getElementById("widgetChart4");
	//   if (ctx) {
	//     ctx.height = 115;
	//     var myChart = new Chart(ctx, {
	//       type: 'bar',
	//       data: {
	//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	//         datasets: [
	//           {
	//             label: "My First dataset",
	//             data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 60, 60, 75],
	//             borderColor: "transparent",
	//             borderWidth: "0",
	//             backgroundColor: "rgba(255,255,255,.3)"
	//           }
	//         ]
	//       },
	//       options: {
	//         maintainAspectRatio: true,
	//         legend: {
	//           display: false
	//         },
	//         scales: {
	//           xAxes: [{
	//             display: false,
	//             categoryPercentage: 1,
	//             barPercentage: 0.65
	//           }],
	//           yAxes: [{
	//             display: false
	//           }]
	//         }
	//       }
	//     });
	//   }
}

function widgetChart2(response) {
	let monthly_count = document.getElementById('monthly_count');
	monthly_count.innerHTML = response['count'];
	let days = [];
	let values = [];

	for (let key in response['days']) {
		days.push(key);
		values.push(response['days'][key])
	}

	var ctx = document.getElementById("widgetChart2");
	if (ctx) {
		ctx.height = 130;
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: days,
				type: 'line',
				datasets: [{
					data: values,
					label: 'Baxış sayı',
					backgroundColor: 'transparent',
					borderColor: 'rgba(255,255,255,.55)',
				},]
			},
			options: {

				maintainAspectRatio: false,
				legend: {
					display: false
				},
				responsive: true,
				tooltips: {
					mode: 'index',
					titleFontSize: 12,
					titleFontColor: '#000',
					bodyFontColor: '#000',
					backgroundColor: '#fff',
					titleFontFamily: 'Montserrat',
					bodyFontFamily: 'Montserrat',
					cornerRadius: 3,
					intersect: false,
				},
				scales: {
					xAxes: [{
						gridLines: {
							color: 'transparent',
							zeroLineColor: 'transparent'
						},
						ticks: {
							fontSize: 2,
							fontColor: 'transparent'
						}
					}],
					yAxes: [{
						display: false,
						ticks: {
							display: false,
						}
					}]
				},
				title: {
					display: false,
				},
				elements: {
					line: {
						tension: 0.00001,
						borderWidth: 1
					},
					point: {
						radius: 4,
						hitRadius: 10,
						hoverRadius: 4
					}
				}
			}
		});
	}
}

function widgetChart3(response) {

	let weekly_count_id = document.getElementById('weekly_count');
	let count = response['weekly'];
	weekly_count_id.innerHTML = count;

	let dates = response['dates'];
	let labels = [];
	let data = [];


	for (let key in dates) {
		labels.push(key);
		data.push(dates[key]);
	}
	labels = labels.reverse();
	data = data.reverse();


	var ctx = document.getElementById("widgetChart3");
	if (ctx) {
		ctx.height = 130;
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				type: 'line',
				datasets: [{
					data: data,
					label: 'Baxış sayı',
					backgroundColor: 'transparent',
					borderColor: 'rgba(255,255,255,.55)',
				},]
			},
			options: {

				maintainAspectRatio: false,
				legend: {
					display: false
				},
				responsive: true,
				tooltips: {
					mode: 'index',
					titleFontSize: 12,
					titleFontColor: '#000',
					bodyFontColor: '#000',
					backgroundColor: '#fff',
					titleFontFamily: 'Montserrat',
					bodyFontFamily: 'Montserrat',
					cornerRadius: 3,
					intersect: false,
				},
				scales: {
					xAxes: [{
						gridLines: {
							color: 'transparent',
							zeroLineColor: 'transparent'
						},
						ticks: {
							fontSize: 2,
							fontColor: 'transparent'
						}
					}],
					yAxes: [{
						display: false,
						ticks: {
							display: false,
						}
					}]
				},
				title: {
					display: false,
				},
				elements: {
					line: {
						borderWidth: 1
					},
					point: {
						radius: 4,
						hitRadius: 10,
						hoverRadius: 4
					}
				}
			}
		});
	}
}

function widgetChart1(response) {
	let whole_count = document.getElementById('whole_count');
	whole_count.innerHTML = response['count'];
	let labels = [];
	let values = [];
	for (let key in response['months']) {
		labels.push(key);
		values.push(response['months'][key]);
	}
	var ctx = document.getElementById("widgetChart1");
	if (ctx) {
		ctx.height = 130;
		var myChart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: labels,
				type: 'line',
				datasets: [{
					data: values,
					label: 'Baxış sayı',
					backgroundColor: 'rgba(255,255,255,.1)',
					borderColor: 'rgba(255,255,255,.55)',
				},]
			},
			options: {
				maintainAspectRatio: true,
				legend: {
					display: false
				},
				layout: {
					padding: {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					}
				},
				responsive: true,
				scales: {
					xAxes: [{
						gridLines: {
							color: 'transparent',
							zeroLineColor: 'transparent'
						},
						ticks: {
							fontSize: 2,
							fontColor: 'transparent'
						}
					}],
					yAxes: [{
						display: false,
						ticks: {
							display: false,
						}
					}]
				},
				title: {
					display: false,
				},
				elements: {
					line: {
						borderWidth: 0
					},
					point: {
						radius: 0,
						hitRadius: 10,
						hoverRadius: 4
					}
				}
			}
		});
	}
}

async function adminIndex() {
	let res1 = await annual();
	let res2 = await monthly();
	let res4 = await daily();
	let res3 = await weekly();
	widgetChart3(res3);
	widgetChart4(res4);
	widgetChart1(res1);
	widgetChart2(res2);
}



// end admin index








async function projectCreate() {
	const { value: formValues } = await swal({
		title: 'Proyekt yarat',
		html:
			'<input id="swal-input1" placeholder="Proyektin adı" class="swal2-input">' +
			'<input id="swal-input2" placeholder="Qiyməti" class="swal2-input">' +
			'<input id="swal-input3" placeholder="Otaq sayı " class="swal2-input">' +
			'Foto <input onchange="uploadFile(this)" id="swal-input4" type="file">'
		,
		focusConfirm: false,
		preConfirm: () => {
			return [
				document.getElementById('swal-input1').value,
				document.getElementById('swal-input2').value,
				document.getElementById('swal-input3').value
			]
		}
	})

	if (formValues) {

		let project = {
			title: formValues[0],
			price: formValues[1],
			rooms: formValues[2],
			_token: $('meta[name="csrf-token"]').attr('content')
		};

		$.ajax({
			method: 'POST',
			data: project,
			url: `${url}admin/projects`,
			success: (data) => {
				if (data) {
					loadAllProjects(current_page);

					const toast = swal.mixin({
						toast: true,
						position: 'top-end',
						showConfirmButton: false,
						timer: 3000
					});

					toast({
						type: 'success',
						title: 'Uğurla yaradıldı'
					})
				}
			}
		});
	}
}

function loadAll(type) {
	$.ajax({
		method: 'GET',
		url: url + `admin/${type}?page=${current_page}&ajax=true`,
		success: (data) => {
			current_page = data['current_page'];
			whole_pages = data['last_page'];
			createPagination(whole_pages, 'partners');
			switch (type) {
				case 'designos':
					appendTrToDesignoTable(data);
					break;
				case 'portfolios':
					appendTrToPortfolioTable(data);
					break;
			}
		}
	});
}

function loadAllPartners(page) {
	$.ajax({
		method: 'GET',
		url: url + `admin/partners?page=${page}&ajax=true`,
		success: (data) => {
			current_page = data['current_page'];
			whole_pages = data['last_page'];
			createPagination(whole_pages, 'partners');
			appendTrToPartnerTable(data);
		}
	});
}

function loadAllProjects(page) {
	$.ajax({
		method: 'GET',
		url: url + `admin/projects?page=${page}&ajax=true`,
		success: (data) => {
			current_page = data['current_page'];
			whole_pages = data['last_page'];
			createPagination(whole_pages, 'projects');
			appendTrToProjectTable(data);
		}
	});
}

function loadAllSliders(page) {
	$.ajax({
		method: 'GET',
		url: url + `admin/sliders?page=${page}&ajax=true`,
		success: (data) => {
			console.log(data);
			current_page = data['current_page'];
			whole_pages = data['last_page'];
			createPagination(whole_pages, 'sliders');
			appendTrToSliderTable(data);
		}
	});
}


function appendActionButtons(type, id) {

	let action_div_container = document.createElement('div');

	let btn_update = document.createElement('button');
	let btn_info = document.createElement('button');
	let btn_delete = document.createElement('button');

	let form = document.createElement('form');
	let form2 = document.createElement('form');

	form.setAttribute('action', `${url}admin/${type}/${id}/edit`);
	form2.setAttribute('action', `${url}admin/${type}/${id}`);


	btn_update.setAttribute('class', 'item');
	btn_update.setAttribute('data-toggle', 'tooltip');
	btn_update.setAttribute('data-placement', 'top');
	btn_update.setAttribute('title', 'Edit');

	btn_delete.setAttribute('class', 'item');
	btn_delete.setAttribute('data-toggle', 'tooltip');
	btn_delete.setAttribute('data-placement', 'top');
	btn_delete.setAttribute('title', 'Delete');

	btn_info.setAttribute('class', 'item');
	btn_info.setAttribute('data-toggle', 'tooltip');
	btn_info.setAttribute('data-placement', 'top');
	btn_info.setAttribute('title', 'Info');

	let icon_update = document.createElement('i');
	let icon_delete = document.createElement('i');
	let icon_info = document.createElement('i');

	icon_delete.setAttribute('class', 'zmdi zmdi-delete')
	icon_update.setAttribute('class', 'zmdi zmdi-edit');
	icon_info.setAttribute('class', 'zmdi zmdi-info');

	btn_update.appendChild(icon_update);
	btn_delete.appendChild(icon_delete);
	btn_info.appendChild(icon_info);

	btn_delete.setAttribute('onclick', `remove(${id}, '${type}')`);
	if (!type == 'projects') {
		btn_info.setAttribute('onclick', `info(${id}, '${type}')`);
	}

	form.appendChild(btn_update);
	form2.appendChild(btn_info);

	action_div_container.setAttribute('class', 'table-data-feature');
	action_div_container.appendChild(form);
	action_div_container.appendChild(btn_delete);
	if (type == 'projects') {
		action_div_container.appendChild(form2);
	} else {
		action_div_container.appendChild(btn_info);
	}

	return action_div_container;
}

// function appendTrToPortfolioTable(data)
// {	
// 	let portfolios_tbody = document.getElementById('portfolios_tbody');
// 	portfolios_tbody.innerHTML = "";
// 	data['data'].forEach((data, i) => {

// 		let tr = document.createElement('tr');
// 		let spacer = document.createElement('tr');
// 		spacer.setAttribute('class', 'spacer');
// 		tr.setAttribute('class', 'tr-shadow');
// 		let td_id = document.createElement('td');
// 		let td_info = document.createElement('td');
// 		let td_pictures = document.createElement('td');
// 		let actions = document.createElement('td');
// 		let row= document.createElement('div');
// 		row.setAttribute('class', 'row');
// 		let col4 = document.createElement('div');
// 		col4.setAttribute('class', 'col-md-4');
// 		actions.appendChild(appendActionButtons('sliders', data['id']));

// 		td_info.innerHTML = data['info'];
// 		td_id.innerHTML = data['id'];

// 		let img = document.createElement('img');
// 		data['photos'].forEach((img, i) => {
// 			console.log(i);
// 			img.setAttribute('src', `${url}/portfolios/${img['source']}`);
// 			img.setAttribute('style', 'height: 100px');
// 			col4.appendChild(img);
// 			row.appendChild(col4);
// 		});

// 		tr.appendChild(td_id);
// 		tr.appendChild(td_info);

// 		portfolios_tbody.appendChild(tr);
// 		portfolios_tbody.appendChild(spacer);

// 	});	
// }

function appendTrToSliderTable(data) {
	let sliders_tbody = document.getElementById('sliders_tbody');
	sliders_tbody.innerHTML = "";

	data['data'].forEach((data, i) => {
		let tr = document.createElement('tr');
		let spacer = document.createElement('tr');
		spacer.setAttribute('class', 'spacer');
		tr.setAttribute('class', 'tr-shadow');
		let td_id = document.createElement('td');
		let td_header = document.createElement('td');
		let td_info = document.createElement('td');
		let td_photo = document.createElement('td');
		let actions = document.createElement('td');
		let span_email = document.createElement('span');

		actions.appendChild(appendActionButtons('sliders', data['id']));


		span_email.setAttribute('class', 'block-email');
		span_email.innerHTML = data['info'];

		td_header.innerHTML = data['title'];
		td_info.appendChild(span_email);
		td_id.innerHTML = data['id'];

		let image = document.createElement('img');
		image.setAttribute('src', `${url}images/sliders/${data['photo']}`);
		image.setAttribute('style', 'height: 150px;');

		td_photo.appendChild(image);


		tr.appendChild(td_id);
		tr.appendChild(td_header);
		tr.appendChild(td_info);

		tr.appendChild(td_photo);
		tr.appendChild(actions);

		sliders_tbody.appendChild(tr);
		sliders_tbody.appendChild(spacer);

	});
}

function appendTrToDesignoTable(data) {
	let designo_tbody = document.getElementById('designo_tbody');
	designo_tbody.innerHTML = "";

	data['data'].forEach((data, i) => {
		let tr = document.createElement('tr');
		let spacer = document.createElement('tr');
		spacer.setAttribute('class', 'spacer');
		tr.setAttribute('class', 'tr-shadow');
		let td_id = document.createElement('td');
		let td_header = document.createElement('td');
		let td_cat = document.createElement('td');

		let td_info = document.createElement('td');
		let td_360 = document.createElement('td');
		// let td_photos = document.createElement('td');

		let td_header_photo = document.createElement('td');
		let actions = document.createElement('td');
		let span_email = document.createElement('span');

		actions.appendChild(appendActionButtons('designos', data['id']));


		span_email.setAttribute('class', 'block-email');
		span_email.innerHTML = data['info'];

		td_cat.innerHTML = data['category'];

		td_header.innerHTML = data['title'];
		td_info.appendChild(span_email);
		td_id.innerHTML = data['id'];

		let imageheader = document.createElement('img');
		let image_360 = document.createElement('img');

		imageheader.setAttribute('src', `${url}images/designos/headers/${data['header_picture']}`);
		imageheader.setAttribute('style', 'height: 150px;');



		td_header_photo.appendChild(imageheader);


		tr.appendChild(td_id);
		tr.appendChild(td_cat);
		tr.appendChild(td_header);
		tr.appendChild(td_info);
		// tr.appendChild()

		tr.appendChild(td_header_photo);
		tr.appendChild(td_360);
		tr.appendChild(actions);

		designo_tbody.appendChild(tr);
		designo_tbody.appendChild(spacer);

	});
}

function appendTrToProjectTable(data) {

	let projectTbody = document.getElementById('projects_tbody');
	projectTbody.innerHTML = "";

	data['data'].forEach((data, i) => {
		let tr = document.createElement('tr');
		let spacer = document.createElement('tr');
		spacer.setAttribute('class', 'spacer');
		tr.setAttribute('class', 'tr-shadow');
		let td_name = document.createElement('td');
		let td_price = document.createElement('td');
		let td_rooms = document.createElement('td');
		let header_image_td = document.createElement('td');
		let header_image = document.createElement('img');

		let td_id = document.createElement('td');
		let td_real_area = document.createElement('td');
		let td_use_area = document.createElement('td');

		let actions = document.createElement('td');
		let span_email = document.createElement('span');


		actions.appendChild(appendActionButtons('projects', data['id']));

		span_email.setAttribute('class', 'block-email');
		span_email.innerHTML = data['project_price'];

		td_name.innerHTML = data['project_title'];
		td_rooms.innerHTML = data['project_rooms'];
		td_real_area.innerHTML = data['project_area_real'];
		td_use_area.innerHTML = data['project_area_use'];
		td_price.appendChild(span_email);
		td_id.innerHTML = data['id'];
		header_image.setAttribute('src', `${url}images/projects/Headers/${data['header_picture']}`);
		header_image.setAttribute('style', 'height: 100px');

		header_image_td.appendChild(header_image);


		tr.appendChild(td_id);
		tr.appendChild(header_image_td);
		tr.appendChild(td_name);
		tr.appendChild(td_price);
		tr.appendChild(td_real_area);
		tr.appendChild(td_use_area);
		tr.appendChild(td_rooms);
		tr.appendChild(actions);

		projectTbody.appendChild(tr);
		projectTbody.appendChild(spacer);
	});
}


function appendTrToPartnerTable(data) {

	let partnersTbody = document.getElementById('partners_tbody');
	partnersTbody.innerHTML = "";

	data['data'].forEach((data, i) => {
		let tr = document.createElement('tr');
		let spacer = document.createElement('tr');
		spacer.setAttribute('class', 'spacer');
		tr.setAttribute('class', 'tr-shadow');

		let td_id = document.createElement('td');
		let td_name = document.createElement('td');
		let td_web = document.createElement('td');
		let td_logo = document.createElement('td');
		let td_actions = document.createElement('td');
		let span_email = document.createElement('span');

		td_actions.appendChild(appendActionButtons('partners', data['partner_id']));

		span_email.setAttribute('class', 'block-email');
		span_email.innerHTML = data['partner_website'];

		let image = document.createElement('img');
		image.setAttribute('src', `${url}images/partners/${data['partner_logo']}`);
		image.setAttribute('style', 'height: 100px; width: 100%; ');

		td_name.innerHTML = data['partner_name'];
		td_web.innerHTML = data['partner_website'];
		td_logo.appendChild(image);
		td_id.innerHTML = data['partner_id'];


		tr.appendChild(td_id);
		tr.appendChild(td_name);
		tr.appendChild(td_web);

		tr.appendChild(td_logo);
		tr.appendChild(td_actions);

		partnersTbody.appendChild(tr);
		partnersTbody.appendChild(spacer);

	});

}


function createPagination(whole_pages, type) {

	pagination.innerHTML = "";

	for (let i = 0; i < whole_pages + 2; i++) {
		let element = document.createElement('li');
		let anchor = document.createElement('a');
		anchor.setAttribute('href', '#');


		element.setAttribute('onclick', `updatePage(this, ${i}, '${type}')`);

		element.setAttribute('id', `list_id_${i}`);


		anchor.setAttribute('class', 'page-link');
		if (i == 0 || i == whole_pages + 1) {

			let span1 = document.createElement('span');
			let span2 = document.createElement('span');

			span1.setAttribute('aria-hidden', 'true');
			let span_direction = (i == 0) ? 'fa-angle-double-left' : 'fa-angle-double-right';
			span1.innerHTML = `<i class='fas ${span_direction}'></i>`;

			span2.setAttribute('class', 'sr-only');
			span2.textContent = "Previous";


			let anchor_direction = (i == 0) ? 'Previous' : 'Last';
			anchor.setAttribute('aria-label', anchor_direction);

			anchor.appendChild(span1);
			anchor.appendChild(span2);


		} else {

			anchor.textContent = i;

		}
		element.setAttribute('class', "page-item");
		if (i == current_page) {
			element.classList.add("active");
		}
		element.appendChild(anchor);
		pagination.appendChild(element)
	}
}

function updatePage(e, i, type) {


	if (i == 0) i = 1;
	if (i == whole_pages + 1) i = whole_pages;

	if (i !== 0 && i !== whole_pages + 1) {

		document.getElementById(`list_id_${current_page}`).classList.remove('active');
		current_page = i;
		document.getElementById(`list_id_${i}`).classList.add('active');

		switch (type) {
			case 'projects':
				loadAllProjects(current_page);
				break;
			case 'partners':
				loadAllPartners(current_page);
				break;
		}

	}
	return false;
}
function removePortfolio(id) {

	swal({
		title: 'Silməyə əminsiniz?',
		text: "You won't be able to revert this!",
		type: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if (result.value) {

			$.ajaxSetup({
				headers: {
					'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
				}
			});

			alert(id);
			$.ajax({
				method: 'DELETE',
				url: `${url}admin/portfolios/${id}`,
				success: (data) => {
					console.log(data);
					if (data['status'] == 200) {
						swal(
							'Silindi!',
							'Proyekt silindi!',
							'success'
						);
						window.location.reload();
					}
				}
			});



		}
	})

}
function remove(id, type) {

	switch (type) {
		case 'projects':
			swal({
				title: 'Silməyə əminsiniz?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.value) {

					$.ajaxSetup({
						headers: {
							'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
						}
					});

					$.ajax({
						method: 'DELETE',
						url: `${url}admin/projects/${id}`,
						success: (data) => {
							if (data['status'] == 200) {
								loadAllProjects(current_page);
							}
						}
					});

					swal(
						'Silindi!',
						'Proyekt silindi!',
						'success'
					);

				}
			})
			break;

		case 'partners':
			swal({
				title: 'Silməyə əminsiniz?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.value) {

					$.ajaxSetup({
						headers: {
							'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
						}
					});

					$.ajax({
						method: 'DELETE',
						url: `${url}admin/partners/${id}`,
						success: (data) => {
							if (data['status'] == 200) {
								loadAllPartners(current_page);
							}
						}
					});

					swal(
						'Silindi!',
						'Partnyor silindi!',
						'success'
					);

				}
			})
			break;

		case 'sliders':
			swal({
				title: 'Silməyə əminsiniz?',
				text: "You won't be able to revert this!",
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.value) {

					$.ajaxSetup({
						headers: {
							'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
						}
					});

					$.ajax({
						method: 'DELETE',
						url: `${url}admin/sliders/${id}`,
						success: (data) => {
							if (data['status'] == 200) {
								loadAllSliders(current_page);
							}
						}
					});

					swal(
						'Silindi!',
						'Slayder silindi!',
						'success'
					);

				}
			})
			break;
	}

}

function updateProject() {
	alert("update");
}

function info(id, type) {

	switch (type) {
		case 'projects':
			$.ajax({
				method: 'GET',
				url: `${url}admin/projects/${id}`,
				success: (data) => {

					swal({
						title: `<strong>${data['project_title']}</strong>`,
						type: 'info',
						html:
							`Otaq sayı: ${data['project_rooms']} <br>
							 Qiymət: ${data['project_price']}
						 
						 `,
						showCloseButton: true
					})

				}
			});
			break;
		case 'partners':
			$.ajax({
				method: 'GET',
				url: `${url}admin/partners/${id}`,
				success: (data) => {

					swal({
						title: `<strong>${data['partner_name']}</strong>`,
						type: 'info',
						html:
							`Web sayt: ${data['partner_website']} <br>
							 Logo: <br> <img src='${url}images/partners/${data['partner_logo']}' style='height: 100px; width: 100px; border-radius: 50%'/>
						 
						 `,
						showCloseButton: true
					})

				}
			});
			break;

		case 'sliders':
			$.ajax({
				method: 'GET',
				url: `${url}admin/sliders/${id}`,
				success: (data) => {

					swal({
						title: `<strong>${data['title']}</strong>`,
						type: 'info',
						html:
							`İnfo: ${data['info']} <br>
							 Foto: <br> <img src='${url}images/sliders/${data['photo']}' style='height: 100px;'/>
						 
						 `,
						showCloseButton: true
					})

				}
			});
			break;
	}
}

function getSingleData(id, type) {
	return new Promise(resolve => {

		$.ajax({
			method: "GET",
			urL: `${url}admin/${type}/${id}`,
			success: (data) => {
				resolve(data);
			}
		});

	});
}

function uploadFile(e) {
	console.log(e.files);
	// readFile(input.srcElements.files[0]);
}



function appendImage(input, type) {

	let container = document.getElementsByClassName("project_edit_image_container");

	for (let i = 0; i < input.files.length; i++) {
		let font = document.createElement('i');
		font.classList.add('fas');
		font.classList.add("fa-times");
		let div = document.createElement('div');
		div.classList.add("edit-image-container");
		div.classList.add("col-md-3");
		let span = document.createElement('span');
		let image = document.createElement('img');

		span.classList.add("edit-image-remove-cross");
		// span.setAttribute('onclick', `removePreview(this, ${i})`);
		span.classList.add("appended-image-remove-cross");
		var reader = new FileReader();
		reader.onload = function (e) {
			image.setAttribute('src', e.target.result);
			image.setAttribute('style', 'width:100%');
			image.classList.add("edit_project_pictures");
			// span.appendChild(font);
			div.appendChild(span);
			div.appendChild(image);
			container[container.length - 1].appendChild(div);
		}
		reader.readAsDataURL(input.files[i]);

	}

	// if (input.files && input.files[0]) {
	// 	var reader = new FileReader();



	// 	

	// 	container[container.length - 1].appendChild(div);

	// }
}

$("#edit_project_new_picture").change(function (e) {
	let id = $("#project_id").val();

	//   $.ajaxSetup({
	//       headers: {
	//           'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	//       }
	//   });
	//   let file = e.target.files[0];
	// $.ajax({
	// 	method: "POST",
	//       processData: false, // Don't process the files
	//       contentType: true,
	// 	file: true,
	// 	url: `${url}admin/uploadImage/projects/${id}`,
	// 	data: file,
	// 	success: function(data){
	// 		console.log(data);
	// 	}
	// });
	appendImage(this, "projects");
});

function removePreview(span, id) {
	console.log(id);
	let inpt = $("#edit_project_new_picture");
	// inpt[0]['files'].shift();
	inpt[0]['files'][id] = null;
	console.log(inpt[0]['files'][id]);

	// $(span).parent('.edit-image-container').fadeOut();
}


function removePicture(type, id, pictureid, source) {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$(`.container_${pictureid}`).fadeOut();
	$.ajax({
		method: 'GET',
		url: `${url}admin/${type}/${id}/remove/picture/${pictureid}/${source}`,
		success: (data) => {
			console.log(data);
		}
	});

	// $.ajax(ajax)
}

function removeProjectPicture(projectid, pictureid, source, type) {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$(`.container_${pictureid}`).fadeOut();
	$.ajax({
		method: 'GET',
		url: `${url}admin/remove/${projectid}/${pictureid}/${source}/${type}`,
		success: (data) => {
			console.log(data);
		}
	});
}

function removeDesignoPicture(designoid, pictureid, source) {
	$.ajaxSetup({
		headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
		}
	});
	$(`.container_${pictureid}`).fadeOut();

	$.ajax({
		method: 'GET',
		url: `${url}admin/designos/${designoid}/remove/picture/${pictureid}/${source}`,
		success: (data) => {
			console.log(data);
		}
	});

}