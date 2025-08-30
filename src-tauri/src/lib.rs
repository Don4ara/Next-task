use std::sync::Mutex;
use tauri::{AppHandle, Manager, State};

struct SetupState {
  frontend_done: bool,
  backend_done: bool, // если нет бэкенда — оставь true
}

#[tauri::command]
async fn set_complete(app: AppHandle, state: State<'_, Mutex<SetupState>>, task: String) -> Result<(), String> {
  {
    let mut s = state.lock().map_err(|_| "lock poisoned")?;
    match task.as_str() {
      "frontend" => s.frontend_done = true,
      "backend"  => s.backend_done  = true,
      _ => {}
    }
    if !(s.frontend_done && s.backend_done) {
      return Ok(()); // ждём второй флаг
    }
  }

  // Оба флага готовы — закрываем сплэш и показываем главное окно
  if let Some(splash) = app.get_webview_window("splashscreen") {
    let _ = splash.close();
  }
  if let Some(main) = app.get_webview_window("main") {
    let _ = main.show();
  }
  Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    // плагины
    .plugin(tauri_plugin_updater::Builder::new().build())
    .plugin(tauri_plugin_dialog::init())
    // состояние готовности
    .manage(Mutex::new(SetupState {
      frontend_done: false,
      backend_done: true, // если у тебя есть инициализация на Rust — поставь false и дерни set_complete("backend") из неё
    }))
    // команды для invoke()
    .invoke_handler(tauri::generate_handler![set_complete])
    // лог только в dev
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }

      // На всякий случай убедимся, что main скрыто (если в конфиге забыли visible:false)
      if let Some(main) = app.get_webview_window("main") {
        let _ = main.hide();
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
