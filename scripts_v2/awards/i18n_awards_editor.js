(function () {
    'use strict';

    if (!window.StatKISS_AWARDS_I18N) {
        return;
    }

    const patchKeys = [
    "awards.manage.edit_mode_title",
    "awards.manage.edit_mode_desc",
    "awards.action.delete",
    "awards.list.empty",
    "awards.alert.forbidden",
    "awards.manage.years_title",
    "awards.manage.years_desc",
    "awards.manage.selected_year",
    "awards.manage.no_year_selected",
    "awards.manage.history_hint",
    "awards.manage.unsaved_changes",
    "awards.manage.saved_state",
    "awards.action.undo",
    "awards.action.redo",
    "awards.action.add_year",
    "awards.action.move_up",
    "awards.action.move_down",
    "awards.action.remove_year",
    "awards.action.apply_year",
    "awards.alert.enter_valid_year",
    "awards.alert.year_exists",
    "awards.alert.no_year_selected",
    "awards.alert.delete_year_confirm",
    "awards.alert.save_failed",
    "awards.alert.discard_confirm",
    "awards.alert.invalid_awardee_name",
    "awards.alert.invalid_awardee_affiliation",
    "awards.alert.unsaved_leave"
];

    const patchDict = {
    "en": {
        "awards.manage.edit_mode_title": "Edit awardees",
        "awards.manage.edit_mode_desc": "Manage years and awardees for this award page. Changes are saved when you press Done.",
        "awards.action.delete": "Delete",
        "awards.list.empty": "No awardees yet.",
        "awards.alert.forbidden": "You do not have permission to edit awardees.",
        "awards.manage.years_title": "Years",
        "awards.manage.years_desc": "Add a year, select it, then manage its awardees.",
        "awards.manage.selected_year": "Selected year",
        "awards.manage.no_year_selected": "Add or select a year to begin editing.",
        "awards.manage.history_hint": "Use Ctrl+Z to undo and Ctrl+Y to redo.",
        "awards.manage.unsaved_changes": "Unsaved changes",
        "awards.manage.saved_state": "All changes saved in draft",
        "awards.action.undo": "Undo",
        "awards.action.redo": "Redo",
        "awards.action.add_year": "Add Year",
        "awards.action.move_up": "Move up",
        "awards.action.move_down": "Move down",
        "awards.action.remove_year": "Remove Year",
        "awards.action.apply_year": "Apply Year",
        "awards.alert.enter_valid_year": "Please enter a valid year.",
        "awards.alert.year_exists": "That year already exists.",
        "awards.alert.no_year_selected": "Please select a year first.",
        "awards.alert.delete_year_confirm": "Remove this year and all awardees in it?",
        "awards.alert.save_failed": "Failed to save the awardees.",
        "awards.alert.discard_confirm": "Discard your unsaved changes and leave edit mode?",
        "awards.alert.invalid_awardee_name": "Please enter a name for every awardee.",
        "awards.alert.invalid_awardee_affiliation": "Please enter an affiliation for every awardee.",
        "awards.alert.unsaved_leave": "You have unsaved changes. Leave this page?"
    },
    "ko": {
        "awards.manage.edit_mode_title": "수상자 편집",
        "awards.manage.edit_mode_desc": "이 상 페이지의 연도와 수상자를 관리할 수 있습니다. 완료를 누를 때 저장됩니다.",
        "awards.action.delete": "삭제",
        "awards.list.empty": "아직 등록된 수상자가 없습니다.",
        "awards.alert.forbidden": "수상자를 수정할 권한이 없습니다.",
        "awards.manage.years_title": "연도",
        "awards.manage.years_desc": "연도를 추가하고 선택한 뒤, 그 안에서 수상자를 관리하세요.",
        "awards.manage.selected_year": "선택된 연도",
        "awards.manage.no_year_selected": "편집을 시작하려면 연도를 추가하거나 선택하세요.",
        "awards.manage.history_hint": "Ctrl+Z로 되돌리고 Ctrl+Y로 다시 실행할 수 있습니다.",
        "awards.manage.unsaved_changes": "저장되지 않은 변경사항",
        "awards.manage.saved_state": "초안에 모든 변경사항이 반영됨",
        "awards.action.undo": "되돌리기",
        "awards.action.redo": "다시 실행",
        "awards.action.add_year": "연도 추가",
        "awards.action.move_up": "위로",
        "awards.action.move_down": "아래로",
        "awards.action.remove_year": "연도 삭제",
        "awards.action.apply_year": "연도 적용",
        "awards.alert.enter_valid_year": "올바른 연도를 입력해 주세요.",
        "awards.alert.year_exists": "해당 연도는 이미 있습니다.",
        "awards.alert.no_year_selected": "먼저 연도를 선택해 주세요.",
        "awards.alert.delete_year_confirm": "이 연도와 그 안의 모든 수상자를 삭제하시겠습니까?",
        "awards.alert.save_failed": "수상자 저장에 실패했습니다.",
        "awards.alert.discard_confirm": "저장되지 않은 변경사항을 버리고 편집 모드를 종료하시겠습니까?",
        "awards.alert.invalid_awardee_name": "모든 수상자에 대해 이름을 입력해 주세요.",
        "awards.alert.invalid_awardee_affiliation": "모든 수상자에 대해 소속을 입력해 주세요.",
        "awards.alert.unsaved_leave": "저장되지 않은 변경사항이 있습니다. 이 페이지를 떠나시겠습니까?"
    },
    "ja": {
        "awards.manage.edit_mode_title": "受賞者を編集",
        "awards.manage.edit_mode_desc": "この賞ページの年と受賞者を管理できます。変更は完了を押すと保存されます。",
        "awards.action.delete": "削除",
        "awards.list.empty": "受賞者はまだ登録されていません。",
        "awards.alert.forbidden": "受賞者を編集する権限がありません。"
    },
    "zh-Hans": {
        "awards.manage.edit_mode_title": "编辑获奖者",
        "awards.manage.edit_mode_desc": "您可以管理该奖项页面的年份和获奖者。按下完成后才会保存更改。",
        "awards.action.delete": "删除",
        "awards.list.empty": "暂无获奖者。",
        "awards.alert.forbidden": "您没有编辑获奖者的权限。"
    },
    "zh-Hant": {
        "awards.manage.edit_mode_title": "編輯得獎者",
        "awards.manage.edit_mode_desc": "您可以管理此獎項頁面的年份與得獎者。按下完成後才會儲存變更。",
        "awards.action.delete": "刪除",
        "awards.list.empty": "目前尚無得獎者。",
        "awards.alert.forbidden": "您沒有編輯得獎者的權限。"
    },
    "es": {
        "awards.manage.edit_mode_title": "Editar galardonados",
        "awards.manage.edit_mode_desc": "Puede administrar los años y galardonados de esta página del premio. Los cambios se guardan al pulsar Listo.",
        "awards.action.delete": "Eliminar",
        "awards.list.empty": "Todavía no hay galardonados.",
        "awards.alert.forbidden": "No tiene permiso para editar galardonados."
    },
    "fr": {
        "awards.manage.edit_mode_title": "Modifier les lauréats",
        "awards.manage.edit_mode_desc": "Vous pouvez gérer les années et les lauréats de cette page de prix. Les changements sont enregistrés lorsque vous appuyez sur Terminé.",
        "awards.action.delete": "Supprimer",
        "awards.list.empty": "Aucun lauréat pour le moment.",
        "awards.alert.forbidden": "Vous n'avez pas l'autorisation de modifier les lauréats."
    },
    "de": {
        "awards.manage.edit_mode_title": "Preisträger bearbeiten",
        "awards.manage.edit_mode_desc": "Sie können Jahre und Preisträger auf dieser Preis-Seite verwalten. Änderungen werden gespeichert, wenn Sie auf Fertig klicken.",
        "awards.action.delete": "Löschen",
        "awards.list.empty": "Noch keine Preisträger vorhanden.",
        "awards.alert.forbidden": "Sie haben keine Berechtigung, Preisträger zu bearbeiten."
    },
    "pt-BR": {
        "awards.manage.edit_mode_title": "Editar premiados",
        "awards.manage.edit_mode_desc": "Você pode gerenciar os anos e premiados desta página. As alterações são salvas quando você pressiona Concluir.",
        "awards.action.delete": "Excluir",
        "awards.list.empty": "Ainda não há premiados.",
        "awards.alert.forbidden": "Você não tem permissão para editar premiados."
    },
    "ru": {
        "awards.manage.edit_mode_title": "Редактировать лауреатов",
        "awards.manage.edit_mode_desc": "Вы можете управлять годами и лауреатами на этой странице награды. Изменения сохраняются после нажатия Готово.",
        "awards.action.delete": "Удалить",
        "awards.list.empty": "Пока нет лауреатов.",
        "awards.alert.forbidden": "У вас нет прав на редактирование лауреатов."
    },
    "id": {
        "awards.manage.edit_mode_title": "Edit penerima penghargaan",
        "awards.manage.edit_mode_desc": "Anda dapat mengelola tahun dan penerima penghargaan di halaman ini. Perubahan disimpan saat Anda menekan Selesai.",
        "awards.action.delete": "Hapus",
        "awards.list.empty": "Belum ada penerima penghargaan.",
        "awards.alert.forbidden": "Anda tidak memiliki izin untuk mengedit penerima penghargaan."
    },
    "vi": {
        "awards.manage.edit_mode_title": "Chỉnh sửa người nhận giải",
        "awards.manage.edit_mode_desc": "Bạn có thể quản lý năm và người nhận giải trên trang này. Thay đổi được lưu khi bạn nhấn Hoàn tất.",
        "awards.action.delete": "Xóa",
        "awards.list.empty": "Chưa có người nhận giải nào.",
        "awards.alert.forbidden": "Bạn không có quyền chỉnh sửa người nhận giải."
    },
    "th": {
        "awards.manage.edit_mode_title": "แก้ไขผู้รับรางวัล",
        "awards.manage.edit_mode_desc": "คุณสามารถจัดการปีและผู้รับรางวัลในหน้านี้ได้ การเปลี่ยนแปลงจะถูกบันทึกเมื่อกดเสร็จสิ้น",
        "awards.action.delete": "ลบ",
        "awards.list.empty": "ยังไม่มีผู้รับรางวัล",
        "awards.alert.forbidden": "คุณไม่มีสิทธิ์แก้ไขผู้รับรางวัล"
    },
    "ms": {
        "awards.manage.edit_mode_title": "Edit penerima anugerah",
        "awards.manage.edit_mode_desc": "Anda boleh mengurus tahun dan penerima anugerah pada halaman ini. Perubahan disimpan apabila anda menekan Selesai.",
        "awards.action.delete": "Padam",
        "awards.list.empty": "Belum ada penerima anugerah.",
        "awards.alert.forbidden": "Anda tidak mempunyai kebenaran untuk mengedit penerima anugerah."
    },
    "fil": {
        "awards.manage.edit_mode_title": "I-edit ang mga awardee",
        "awards.manage.edit_mode_desc": "Maaari mong pamahalaan ang mga taon at awardee sa pahinang ito. Masa-save ang mga pagbabago kapag pinindot mo ang Tapos.",
        "awards.action.delete": "Tanggalin",
        "awards.list.empty": "Wala pang awardee.",
        "awards.alert.forbidden": "Wala kang pahintulot na mag-edit ng mga awardee."
    },
    "hi": {
        "awards.manage.edit_mode_title": "पुरस्कार प्राप्तकर्ताओं को संपादित करें",
        "awards.manage.edit_mode_desc": "आप इस पुरस्कार पृष्ठ पर वर्षों और प्राप्तकर्ताओं को प्रबंधित कर सकते हैं। बदलाव तब सहेजे जाते हैं जब आप पूर्ण पर क्लिक करते हैं।",
        "awards.action.delete": "हटाएँ",
        "awards.list.empty": "अभी तक कोई पुरस्कार प्राप्तकर्ता नहीं है।",
        "awards.alert.forbidden": "आपको पुरस्कार प्राप्तकर्ताओं को संपादित करने की अनुमति नहीं है।"
    },
    "ar": {
        "awards.manage.edit_mode_title": "تحرير الحاصلين على الجائزة",
        "awards.manage.edit_mode_desc": "يمكنك إدارة السنوات والحاصلين على الجائزة في هذه الصفحة. تُحفَظ التغييرات عند الضغط على تم.",
        "awards.action.delete": "حذف",
        "awards.list.empty": "لا يوجد حاصلون على الجائزة بعد.",
        "awards.alert.forbidden": "ليست لديك صلاحية تعديل الحاصلين على الجائزة."
    },
    "it": {
        "awards.manage.edit_mode_title": "Modifica i premiati",
        "awards.manage.edit_mode_desc": "Puoi gestire anni e premiati in questa pagina. Le modifiche vengono salvate quando premi Fine.",
        "awards.action.delete": "Elimina",
        "awards.list.empty": "Non ci sono ancora premiati.",
        "awards.alert.forbidden": "Non hai l'autorizzazione per modificare i premiati."
    },
    "nl": {
        "awards.manage.edit_mode_title": "Prijswinnaars bewerken",
        "awards.manage.edit_mode_desc": "Je kunt jaren en prijswinnaars op deze pagina beheren. Wijzigingen worden opgeslagen wanneer je op Klaar drukt.",
        "awards.action.delete": "Verwijderen",
        "awards.list.empty": "Er zijn nog geen prijswinnaars.",
        "awards.alert.forbidden": "Je hebt geen toestemming om prijswinnaars te bewerken."
    },
    "pl": {
        "awards.manage.edit_mode_title": "Edytuj laureatów",
        "awards.manage.edit_mode_desc": "Możesz zarządzać latami i laureatami na tej stronie nagrody. Zmiany są zapisywane po naciśnięciu Gotowe.",
        "awards.action.delete": "Usuń",
        "awards.list.empty": "Brak laureatów.",
        "awards.alert.forbidden": "Nie masz uprawnień do edytowania laureatów."
    },
    "sv": {
        "awards.manage.edit_mode_title": "Redigera pristagare",
        "awards.manage.edit_mode_desc": "Du kan hantera år och pristagare på den här sidan. Ändringar sparas när du trycker på Klar.",
        "awards.action.delete": "Ta bort",
        "awards.list.empty": "Det finns inga pristagare ännu.",
        "awards.alert.forbidden": "Du har inte behörighet att redigera pristagare."
    },
    "tr": {
        "awards.manage.edit_mode_title": "Ödül alanları düzenle",
        "awards.manage.edit_mode_desc": "Bu sayfada yılları ve ödül alan kişileri yönetebilirsiniz. Değişiklikler Bitti'ye bastığınızda kaydedilir.",
        "awards.action.delete": "Sil",
        "awards.list.empty": "Henüz ödül alan yok.",
        "awards.alert.forbidden": "Ödül alanları düzenleme izniniz yok."
    },
    "uk": {
        "awards.manage.edit_mode_title": "Редагувати лауреатів",
        "awards.manage.edit_mode_desc": "Ви можете керувати роками та лауреатами на цій сторінці. Зміни зберігаються після натискання Готово.",
        "awards.action.delete": "Видалити",
        "awards.list.empty": "Лауреатів поки немає.",
        "awards.alert.forbidden": "У вас немає дозволу редагувати лауреатів."
    }
};

    const awardsI18N = window.StatKISS_AWARDS_I18N;
    const languages = Array.isArray(awardsI18N.languages) ? awardsI18N.languages : [];

    if (!Array.isArray(awardsI18N.UI_KEYS)) {
        awardsI18N.UI_KEYS = [];
    }

    patchKeys.forEach((key) => {
        if (!awardsI18N.UI_KEYS.includes(key)) {
            awardsI18N.UI_KEYS.push(key);
        }
    });

    Object.keys(patchDict).forEach((langCode) => {
        if (!awardsI18N.dict[langCode]) {
            awardsI18N.dict[langCode] = {};
        }

        Object.assign(awardsI18N.dict[langCode], patchDict[langCode]);
    });

    if (typeof awardsI18N.normalizeCoverage === 'function') {
        awardsI18N.normalizeCoverage();
    } else {
        const en = awardsI18N.dict.en || {};
        const ko = awardsI18N.dict.ko || {};
        languages.forEach((language) => {
            const code = typeof language === 'string' ? language : language && language.code;
            if (!code) return;
            if (!awardsI18N.dict[code]) awardsI18N.dict[code] = {};
            patchKeys.forEach((key) => {
                if (awardsI18N.dict[code][key] == null || awardsI18N.dict[code][key] === '') {
                    awardsI18N.dict[code][key] = en[key] ?? ko[key] ?? key;
                }
            });
        });
    }

    if (typeof awardsI18N.mergeIntoCore === 'function') {
        awardsI18N.mergeIntoCore();
    }
})();
