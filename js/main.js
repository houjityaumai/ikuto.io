$(function () {
  //z-index 増えるから初期値設定 設定することで、表示したwindowが最前面に来る
  let zIndex = 5;
  let maxzindex = zIndex;

  //ーーーーードラッグ機能ーーーーーー
  let $draggableElements = $(".mini-window");

  // ドラッグ状態を管理する変数（各要素ごとに状態を保持）
  let isDragging = Array($draggableElements.length).fill(false);

  // ドラッグ開始時のマウス座標を保持する変数（各要素ごとに状態を保持）
  let initialX = Array($draggableElements.length);
  let initialY = Array($draggableElements.length);

  // ドラッグ可能な要素にmousedownイベントを追加
  $draggableElements.on("mousedown", function (event) {
    const index = $draggableElements.index(this);
    isDragging[index] = true;

    // ドラッグ開始時のマウス座標と要素の位置を取得
    const boundingRect = this.getBoundingClientRect();
    initialX[index] = event.clientX - boundingRect.left - window.scrollX;
    initialY[index] = event.clientY - boundingRect.top - window.scrollY;

    // キャプチャされたマウスイベントを防ぐための処理
    event.preventDefault();
    zIndex = maxzindex + 1;
    maxzindex = zIndex;
  });

  // ドラッグ中のmousemoveイベントをdocumentに追加
  $(document).on("mousemove", function (event) {
    $draggableElements.each(function (index) {
      if (isDragging[index]) {
        // マウスの現在の座標を取得
        const currentX = event.clientX - initialX[index];
        const currentY = event.clientY - initialY[index];

        // 要素の位置を変更
        $(this).css({
          left: `${currentX}px`,
          top: `${currentY}px`,
          zIndex: zIndex,
        });
      }
    });
  });

  // ドラッグ終了時のmouseupイベントをdocumentに追加
  $(document).on("mouseup", function () {
    // 全ての要素のドラッグ状態をリセット
    isDragging.fill(false);
  });
  //-----------window表示------------

  //window取得
  const $minWindows = $(".window");
  //icon取得
  const $icon = $(".icon");
  $icon.on("click", function () {
    const $iconClassName = $(this).attr("class").split(" ")[0];
    // const $window = $draggableElements.filter(`.${$class_str}`);
    const $window = $minWindows.filter(`.${$iconClassName}`);
    $window.css({
      display: "block",
      zIndex: zIndex,
    });
    zIndex = maxzindex + 1;
    maxzindex = zIndex;
  });

  // ----------画像表示機能(ドラッグ機能、×ボタン機能も内蔵)----------
  const $images = $(".image-content");
  const $main = $("main");
  $images.on("click", function () {
    console.log("aaaaaaaaaaaaaaaaaaaagaaaaaaaaaaaaga");
    //複製
    const $imageWindow = $(".image-window-damy").clone();
    //クラス名を変更
    $imageWindow.removeClass("image-window-damy");
    $imageWindow.addClass("image-window");
    console.log($imageWindow.attr("class"));
    //titleを設定
    const titleText = $(this).find("p").text();
    $imageWindow.find(".mini-header .title").text(`【画像】${titleText}`);
    //imgのsrcを設定
    const imgSrc = $(this).find("img").attr("src");
    $imageWindow.find(".mini-main .main-img").attr("src", imgSrc);
    $imageWindow.css({
      display: "block",
      zIndex: zIndex,
    });
    //htmlに追加
    $main.append($imageWindow[0]);
    //ドラッグ機能 jqのUIライブラリ
    $imageWindow.draggable({
      handle: ".mini-main, .mini-header",
      start: function (event, ui) {
        // ドラッグが開始されるときの処理
        zIndex = maxzindex + 1;
        maxzindex = zIndex;
        $(this).css("z-index", zIndex);
      },
    });

    zIndex = maxzindex + 1;
    maxzindex = zIndex;

    // ×ボタンのクリックイベント
    const $batubtnimg = $imageWindow.find(".batu");
    $batubtnimg.on("click", function () {
      console.log("ok!!");
      $imageWindow.css({
        display: "none",
      });
    });
  });

  //---------×ボタン機能-----------
  const $batubtn = $draggableElements.find(".batu");
  $batubtn.on("click", function () {
    const index = $batubtn.index(this);
    const $window = $draggableElements.eq(index);
    $window.css({
      display: "none",
    });
  });

  //----------紹介表示機能----------
  const $infos = $(".info ul li");
  $infos.on("click", function () {
    const $info = $draggableElements.filter(`.${$(this).attr("class")}`);
    $info.css({
      display: "block",
      zIndex: zIndex,
    });
    zIndex = maxzindex + 1;
    maxzindex = zIndex;
  });

  // //ーーーーーホバー機能ーーーーーー
  // const $bg = $(".bg");

  // $draggableElements.on("mouseenter", function () {
  //   const image = $(this).find(".main-img").attr("src");

  //   $bg.fadeOut("slow", function () {
  //     $bg.css({
  //       background: `url(${image})`,
  //       BackgroundSize: "cover",
  //     });
  //     $bg.fadeIn("slow");
  //   });
  // });

  // $draggableElements.on("mouseleave", function () {
  //   const image = "./img/3155.jpg";

  //   $bg.fadeOut("slow", function () {
  //     $bg.css({
  //       background: `url(${image})`,
  //       BackgroundSize: "cover",
  //     });
  //     $bg.fadeIn("slow");
  //   });
  // });
});
