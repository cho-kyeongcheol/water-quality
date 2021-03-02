//paint_expert
var sumInit = function(){

};


sumInit.prototype = {
	init : function(){
		console.log("init")
		var owner = this;
		this.node = $(".paint_cost > ul > li");

		this.node.find(".calc_btn > div > a").on("click", function(e){
			e.preventDefault();

			owner.sumSet($(this).parent().index(), $(this).parents(".on").index());
		});

		$(".paint_cost input:text").blur(function(){
			if(!$.isNumeric($(this).val()) && $(this).val().length > 0) {
				owner.sumSet(1);

				alert("���ڸ� �Է� �����մϴ�.");

				$(this).focus();

				return false;
			};
		});
	},

	sumSet : function(num, nodeNum){
		if(num == 0){
			//add sum
			var numArr = [];
			var total = 0;

			this.node.eq(nodeNum).find(".input_calc > ul > li").each(function(){
				numArr.push($(this).find("input").val());
			});

			switch(nodeNum){
				case 0: //�̷е�������
					total = (10 * numArr[0]) / numArr[1];

				break;
				
				case 1: //�̷� ����ҿ䷮
					total = ((10 * numArr[0]) / numArr[1]) * numArr[2];
				
				break;

				case 2: //�̷� ���ᰡ��
					total = ((10 * numArr[0]) / numArr[1]) * numArr[2] * numArr[3];
				
				break;

				case 3: //������������
					total = (numArr[0] * (100 - numArr[1])) / 100;
				
				break;

				case 4: //���� ����ҿ䷮
					total = ((numArr[0] * 100) / (100 - numArr[1])) * ((numArr[2] * numArr[3]) - (numArr[4] * numArr[5]));
				
				break;

				case 5: //���������β�
					total = (numArr[0] * numArr[1]) / 100;
				
				break;

				case 6: //���������β�
					total = (numArr[0] * 100) / numArr[1];
				
				break;

				case 7: //�������Ǵ� ���� ���� ����
					total = (numArr[0] * numArr[1]) / numArr[2];
				
				break;

				case 8: //���������� ���� ���� ����
					total = (numArr[0] * numArr[1] * numArr[2]) / (1000 * numArr[3]);
				
				break;

				case 9: //�µ�ȯ�� ����
					total = (5 / 9) * (numArr[0] - 32);
				
				break;

				case 10: //�µ�ȯ�� ȭ��
					total = (9 / 5) * numArr[0] + 32;
				
				break;

				case 11: //�ν�����
					total = ((numArr[0] - 65) / 10) * 1.054 * numArr[1];
				
				break;

				case 12: //���� �νķ�
					total = 4.153 + 0.880 * numArr[0] - 0.073 * numArr[1] - 0.032 * numArr[2] + 2.913 * numArr[3] + 4.721 * numArr[4];
				
				break;

				case 13: //���� �ν�
					total = numArr[0] * 0.0365 / 7.86;
				
				break;

				case 14: //���� ���� �����
					total = (121 / 400) * numArr[0];
				
				break;

				case 15: //���� ����� ������
					total = (121 / 400) * numArr[0];
				
				break;
			};

			total = Math.round(total);

			this.node.eq(nodeNum).find(".calc_result span").text(total);
		}else{
			//Initialize
			$("input").val("");
			this.node.eq(nodeNum).find(".calc_result span").text("0");
		};
	}
};

//diy_product 
var simpleSum = {
	init : function(){
		var owner = this;
		var str = this.selectProduct();

		$(".select").change(function () {
			str = "";
			str = owner.selectProduct();
		});

		$(".paint_cal .btn_space .btn_blue").on("click", function(e){
			e.preventDefault();

			owner.sumSet(str);
		});

		$(".paint_cal .btn_space .btn_gray").on("click", function(e){
			e.preventDefault();

			owner.firstSet();
		});
		
		$(".paint_cal input:text").blur(function(){
			if(!$.isNumeric($(this).val()) && $(this).val().length > 0) {
				owner.firstSet();

				alert("���ڸ� �Է� �����մϴ�.");
				
				$(this).focus();

				return false;
			};
		});
	},

	selectProduct : function(){
		var str;
		$(".select option:selected").each(function() {
			str = $(this).index();
		});

		this.firstSet();
		
		return str;
	},

	sumSet : function(chk){
		var area;
		var total;

		switch(chk){
			case 0: //�帲��Ʈ
				total = $(".paint_cal .cal_input .input_area .horizon").val() * $(".paint_cal .cal_input .input_area .vertical").val() * 0.15;

			break;
			
			case 1: //����ƿ�� ������
				total = $(".paint_cal .cal_input .input_area .horizon").val() * $(".paint_cal .cal_input .input_area .vertical").val() * 0.125;
			
			break;

			case 2: //���� ������
				total = $(".paint_cal .cal_input .input_area .horizon").val() * $(".paint_cal .cal_input .input_area .vertical").val() * 0.17;
			
			break;
		};

		area = $(".paint_cal .cal_input .input_area .horizon").val() * $(".paint_cal .cal_input .input_area .vertical").val();

		area = Math.round(area);
		total = Math.round(total);

		$(".diy_result > dl:eq(0) dd span").text(area);
		$(".diy_result > dl:eq(1) dd span").text(total);
	},

	firstSet : function(){
		$(".diy_result > dl:eq(0) dd span").text(0);
		$(".diy_result > dl:eq(1) dd span").text(0);

		$(":text").val("").removeClass("off");
	}
};