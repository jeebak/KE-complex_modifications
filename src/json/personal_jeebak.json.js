// JavaScript should be written in ECMAScript 5.1.

const karabiner = require('../lib/karabiner')

const HYPER = ['left_command', 'left_control', 'left_option', 'left_shift']

function main() {
  console.log(
    JSON.stringify(
      //
      // A much simplified copy of the vi_mode.json.js file, for TouchCursor Extended
      //

      {
        title: 'Personal rules (@jeebak)',
        maintainers: ['jeebak'],
        rules: [
          {
            description: 'TouchCursor Extended Mode [Space as Trigger Key]',
            manipulators: [
              //
              // press spacebar to enter TouchCursor Mode, release to quit
              //

              {
                type: 'basic',
                from: { key_code: 'spacebar', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'touchcursor_extended_mode', value: 1 } }],
                to_if_alone: [{ key_code: 'spacebar' }],
                to_after_key_up: [{ set_variable: { name: 'touchcursor_extended_mode', value: 0 } }],
              },

              //
              // change j/k/i/l to arrow keys
              //

              touchCursorKey('j', [{ key_code: 'b', modifiers: ['left_option'] }], {
                modifiers: { mandatory: ['left_option'], optional: ['any'] },
                extraConditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.terminal }],
              }),
              touchCursorKey('j', [{ key_code: 'left_arrow' }]),
              touchCursorKey('k', [{ key_code: 'down_arrow' }]),
              touchCursorKey('i', [{ key_code: 'up_arrow' }]),
              touchCursorKey('l', [{ key_code: 'f', modifiers: ['left_option'] }], {
                modifiers: { mandatory: ['left_option'], optional: ['any'] },
                extraConditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.terminal }],
              }),
              touchCursorKey('l', [{ key_code: 'right_arrow' }]),

              //
              // change u/o to Home/End, and m/p to delete_forward/delete_or_backspace
              //

              touchCursorKey('u', [{ key_code: 'home' }]),
              touchCursorKey('o', [{ key_code: 'end' }]),
              touchCursorKey('m', [{ key_code: 'd', modifiers: ['left_option'] }], {
                modifiers: { mandatory: ['left_option'], optional: ['any'] },
                extraConditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.terminal }],
              }),
              touchCursorKey('m', [{ key_code: 'delete_forward' }]),
              touchCursorKey('p', [{ key_code: 'w', modifiers: ['left_control'] }], {
                modifiers: { mandatory: ['left_option'], optional: ['any'] },
                extraConditions: [{ type: 'frontmost_application_if', bundle_identifiers: karabiner.bundleIdentifiers.terminal }],
              }),
              touchCursorKey('p', [{ key_code: 'delete_or_backspace' }]),

              //
              // change h/n page_up/page_down
              //

              touchCursorKey('h', [{ key_code: 'page_up' }]),
              touchCursorKey('n', [{ key_code: 'page_down' }]),

              //
              // Space-left_shift to ⌥-spacebar (Alfred)
              //

              touchCursorKey('left_shift', [{ key_code: 'spacebar', modifiers: ['left_option'] }], {
                modifiers: { optional: ['caps_lock'] },
              }),
              // ... and left_shift-spacebar too
              {
                type: 'basic',
                from: { key_code: 'spacebar', modifiers: { mandatory: ['left_shift'], optional: ['caps_lock', 'option'] } },
                to: [{ key_code: 'spacebar', modifiers: ['left_option'] }],
              },

              //
              // Space-{a,e,r} to {⌥-any,⌘-any,⇧-any}
              // Space-a to ⌘-a, if alone
              // Space-e to ⌘-n, if alone
              // Space-r to ⌘-r, if alone
              //

              touchCursorKey('a', null, {
                toIfAlone: [{ key_code: 'a', modifiers: ['left_command'] }],
                toIfHeldDown: [{ key_code: 'left_option' }],
                parameters: {
                  'basic.to_if_alone_timeout_milliseconds': 300,
                  'basic.to_if_held_down_threshold_milliseconds': 0,
                },
              }),
              touchCursorKey('e', null, {
                toIfAlone: [{ key_code: 'n', modifiers: ['left_command'] }],
                toIfHeldDown: [{ key_code: 'left_command' }],
                parameters: {
                  'basic.to_if_alone_timeout_milliseconds': 300,
                  'basic.to_if_held_down_threshold_milliseconds': 0,
                },
              }),
              touchCursorKey('r', null, {
                toIfAlone: [{ key_code: 'r', modifiers: ['left_command'] }],
                toIfHeldDown: [{ key_code: 'left_shift' }],
                parameters: {
                  'basic.to_if_alone_timeout_milliseconds': 300,
                  'basic.to_if_held_down_threshold_milliseconds': 0,
                },
              }),

              //
              // Space-{⇥,q,w} to {⌥-⇥,⌘-⇥,⌃-⇥} [shift modifier allowed]
              //

              touchCursorKey('tab', [{ key_code: 'tab', modifiers: ['left_option'] }], {
                modifiers: { optional: ['left_shift'] },
              }),
              touchCursorKey('q', [{ key_code: 'tab', modifiers: ['left_command'] }], {
                modifiers: { optional: ['left_shift'] },
              }),
              touchCursorKey('w', [{ key_code: 'tab', modifiers: ['left_control'] }], {
                modifiers: { optional: ['left_shift'] },
              }),

              //
              // Space-{b,t,s} to {`,~,spacebar}
              //

              touchCursorKey('b', [{ key_code: 'grave_accent_and_tilde' }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('t', [{ key_code: 'grave_accent_and_tilde', modifiers: ['left_shift'] }], {
                modifiers: { optional: ['caps_lock'] },
              }),
              touchCursorKey('s', [{ key_code: 'spacebar' }], { modifiers: { optional: ['caps_lock'] } }),

              //
              // Space-{d,f,g,comma,period} to {⌘-w,⌘-f,⌘-g,⌘-t,⌘-⇧-t}
              //

              touchCursorKey('d', [{ key_code: 'w', modifiers: ['left_command'] }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('f', [{ key_code: 'f', modifiers: ['left_command'] }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('g', [{ key_code: 'g', modifiers: ['left_command'] }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('comma', [{ key_code: 't', modifiers: ['left_command'] }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('period', [{ key_code: 't', modifiers: ['left_command', 'left_shift'] }], {
                modifiers: { optional: ['caps_lock'] },
              }),

              //
              // Space-{z,x,c,v} to {⌘-z,⌘-x,⌘-c,⌘-v}
              //

              touchCursorKey('z', [{ key_code: 'z', modifiers: ['left_command'] }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('x', [{ key_code: 'x', modifiers: ['left_command'] }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('c', [{ key_code: 'c', modifiers: ['left_command'] }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('v', [{ key_code: 'v', modifiers: ['left_command'] }], { modifiers: { optional: ['caps_lock'] } }),
            ],
          },
          {
            description: 'TouchCursor Extended Mode [Space-{1-0,-,=} to {F1-F10,F11,F12}]',
            manipulators: [].concat(
              //
              // Space-{1-0,-,=} to {F1-F10,F11,F12}
              //
              [
                { from: '1', to: 'f1' },
                { from: '2', to: 'f2' },
                { from: '3', to: 'f3' },
                { from: '4', to: 'f4' },
                { from: '5', to: 'f5' },
                { from: '6', to: 'f6' },
                { from: '7', to: 'f7' },
                { from: '8', to: 'f8' },
                { from: '9', to: 'f9' },
                { from: '0', to: 'f10' },
                { from: 'hyphen', to: 'f11' },
                { from: 'equal_sign', to: 'f12' },
              ].map(function (m) {
                return touchCursorKey(m.from, [{ key_code: m.to, modifiers: ['fn'] }], { modifiers: { optional: ['caps_lock'] } })
              }),

              //
              // Misc Personalizations {;,',/}
              // Space-; to ⌘-⌃-; [custom shortcut to: Move left a space]
              // Space-' to ⌘-⌃-' [custom shortcut to: Move right a space]
              // Space-/ to ⌘--/ [custom shortcut to: Toggle iTerm maximized]
              // Space-right_shift to ⌘-⌃--/ [custom shortcut to: Application windows]
              //
              touchCursorKey('semicolon', [{ key_code: 'semicolon', modifiers: ['left_command', 'left_control'] }], {
                modifiers: { optional: ['caps_lock'] },
              }),
              touchCursorKey('quote', [{ key_code: 'quote', modifiers: ['left_command', 'left_control'] }], {
                modifiers: { optional: ['caps_lock'] },
              }),
              touchCursorKey('slash', [{ shell_command: '~/.zgen/jeebak/devtools-master/bin/maccomplice togg_app iTerm2' }], {
                modifiers: { optional: ['caps_lock'] },
              }),
              touchCursorKey('right_shift', [{ key_code: 'slash', modifiers: ['left_command', 'left_control'] }], {
                modifiers: { optional: ['caps_lock'] },
              }),

              //
              // Space-↩ to mission_control
              //
              touchCursorKey('return_or_enter', [{ key_code: 'mission_control' }], { modifiers: { optional: ['caps_lock'] } }),

              //
              // Media keys
              // Space-⎋, and Space-` to rewind
              // Space-⌫  to fastforward
              // Space-y to mute
              // Space-[ to volume_decrement
              // Space-] to volume_increment
              // Space-\ to play_or_pause
              //
              touchCursorKey('escape', [{ key_code: 'rewind' }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('grave_accent_and_tilde', [{ key_code: 'rewind' }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('delete_or_backspace', [{ key_code: 'fastforward' }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('y', [{ key_code: 'mute' }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('open_bracket', [{ key_code: 'volume_decrement' }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('close_bracket', [{ key_code: 'volume_increment' }], { modifiers: { optional: ['caps_lock'] } }),
              touchCursorKey('backslash', [{ key_code: 'play_or_pause' }], { modifiers: { optional: ['caps_lock'] } }),

              //
              // normalize punctuation marks
              //
              touchCursorKey(
                'non_us_pound',
                [{ key_code: 'spacebar' }, { key_code: 'non_us_pound' }, { key_code: 'vk_none' }],
                { modifiers: { optional: ['caps_lock'] } }
              ),
              touchCursorKey(
                'non_us_backslash',
                [{ key_code: 'spacebar' }, { key_code: 'non_us_backslash' }, { key_code: 'vk_none' }],
                { modifiers: { optional: ['caps_lock'] } }
              )

              //
              // normalize remaining unbound letter keys
              //
            ),
          },
          {
            description: 'Tab Modifier Mode [Tab as Trigger Key]',
            manipulators: [].concat(
              //
              // press ⇥ to enter Tab Modifier Mode, release to quit
              //
              {
                type: 'basic',
                from: { key_code: 'tab', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'tab_modifier', value: 1 } }],
                to_if_alone: [{ key_code: 'tab' }],
                to_after_key_up: [{ set_variable: { name: 'tab_modifier', value: 0 } }],
              },

              //
              // Mostly map Tab-[x] to corresponding Hyper-[x]
              //
              [
                '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'hyphen', 'equal_sign', 'delete_or_backspace',
                'q', 'w', 'e', 't', 'y', 'u', 'i', 'o', 'p', 'open_bracket', 'close_bracket', 'backslash',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'semicolon', 'quote', 'return_or_enter',
                'z', 'x', 'c', 'v', 'b', 'n', 'm',
              ].map(function (keyCode) {
                return tabModeHyperKey(keyCode)
              }),

              //
              // Tab-r to ⌥-⌘-r [Used to "Resume Program" in JetBrains Debugger, Hyper-r otherwise]
              //
              {
                type: 'basic',
                conditions: [
                  { type: 'frontmost_application_if', bundle_identifiers: ['^com\\.jetbrains\\.PhpStorm$', '^com\\.jetbrains\\.WebStorm$'] },
                  { type: 'variable_if', name: 'tab_modifier', value: 1 },
                ],
                from: { key_code: 'r', modifiers: { optional: ['caps_lock'] } },
                to: [{ key_code: 'r', modifiers: ['left_command', 'left_option'] }],
              },
              tabModeHyperKey('r'),

              // Tab-, to "???"]
              tabModeKey('comma', [{ shell_command: 'osascript -e \'display notification "Tab-," with title "Triggered:"\'' }]),

              // Tab-. to "???"]
              tabModeKey('period', [{ shell_command: 'osascript -e \'display notification "Tab-." with title "Triggered:"\'' }]),

              // Tab-/ to "???"]
              tabModeKey('slash', [{ shell_command: 'osascript -e \'display notification "Tab-/" with title "Triggered:"\'' }])
            ),
          },
          {
            description: 'MouseCursor Mode [D as Trigger Key]',
            manipulators: [
              //
              // press d to enter MouseCursor Mode, release to quit
              //
              {
                type: 'basic',
                from: { key_code: 'd', modifiers: { optional: ['caps_lock'] } },
                to: [{ set_variable: { name: 'mousecursor_mode', value: 1 } }],
                to_if_alone: [{ key_code: 'd' }],
                to_after_key_up: [{ set_variable: { name: 'mousecursor_mode', value: 0 } }],
              },
              //
              // change j/k/i/l to normal mouse left,down,up,right
              //
              mouseCursorKey('j', { mouse_key: { x: -1536 } }),
              mouseCursorKey('k', { mouse_key: { y: 1536 } }),
              mouseCursorKey('i', { mouse_key: { y: -1536 } }),
              mouseCursorKey('l', { mouse_key: { x: 1536 } }),

              //
              // change h/n/u/o to scroll up/down/left/right
              // (depends on "Scroll direction" in System Preferences)
              //
              mouseCursorKey('h', { mouse_key: { vertical_wheel: 64 } }),
              mouseCursorKey('n', { mouse_key: { vertical_wheel: -64 } }),
              mouseCursorKey('u', { mouse_key: { horizontal_wheel: -64 } }),
              mouseCursorKey('o', { mouse_key: { horizontal_wheel: 64 } }),

              //
              // press a for "accelerated" (faster) movement
              //
              mouseCursorKey('a', { mouse_key: { speed_multiplier: 2.0 } }, { optional: ['caps_lock'] }),
              //
              // press f for "fine-grained" (slower) movement
              //
              mouseCursorKey('f', { mouse_key: { speed_multiplier: 0.3 } }, { optional: ['caps_lock'] }),
            ].concat(
              // buttons
              [
                { from: 'w', to: 'button1' },
                { from: 'g', to: 'button1' },
                { from: 'm', to: 'button1' },
                { from: 's', to: 'button2' },
                { from: 'p', to: 'button2' },
                { from: 'v', to: 'button3' },
                { from: 'slash', to: 'button3' },
                { from: 'semicolon', to: 'button4' },
                { from: 'quote', to: 'button5' },
              ].map(function (m) {
                return mouseCursorKey(m.from, { pointing_button: m.to })
              })
            ),
          },
          {
            description: 'Number Row Modifiers',
            manipulators: [
              //
              // Number row when tapped, and {1,2,3,0,-,=} to ⌥, and {4,5,6,7,8,9} to ⌘, when held
              //
              tapHold('1', 'left_option'),
              tapHold('2', 'left_option'),
              tapHold('3', 'left_option'),
              tapHold('4', 'left_command'),
              tapHold('5', 'left_command'),
              tapHold('6', 'left_command'),
              tapHold('7', 'left_command'),
              tapHold('8', 'left_command'),
              tapHold('9', 'left_command'),
              tapHold('0', 'left_option'),
              tapHold('hyphen', 'left_option'),
              tapHold('equal_sign', 'left_option'),
            ],
          },
          {
            description: 'Home Row Modifiers',
            manipulators: [
              //
              // Right Hand Pinky ⌘ and ⌥<; Tap for ;, hold for ⌘. Tap for ', hold for ⌥
              //
              tapHold('semicolon', 'left_command'),
              tapHold('quote', 'left_option'),
            ],
          },
        ],
      },
      null,
      '  '
    )
  )
}

//
// TouchCursor Extended Mode [Space as Trigger Key] helper
// (also used by the Space-{1-0,-,=} and Misc Personalizations/Media Keys rules,
// since they're gated by the same touchcursor_extended_mode variable)
//
function touchCursorKey(fromKeyCode, to, options) {
  options = options || {}
  const manipulator = {
    type: 'basic',
    from: { key_code: fromKeyCode, modifiers: options.modifiers || { optional: ['any'] } },
  }
  if (to) {
    manipulator.to = to
  }
  if (options.toIfAlone) {
    manipulator.to_if_alone = options.toIfAlone
  }
  if (options.toIfHeldDown) {
    manipulator.to_if_held_down = options.toIfHeldDown
  }
  if (options.parameters) {
    manipulator.parameters = options.parameters
  }
  manipulator.conditions = (options.extraConditions || []).concat([
    { type: 'variable_if', name: 'touchcursor_extended_mode', value: 1 },
  ])
  return manipulator
}

//
// Tab Modifier Mode [Tab as Trigger Key] helpers
//
function tabModeKey(fromKeyCode, to) {
  return {
    type: 'basic',
    conditions: [{ type: 'variable_if', name: 'tab_modifier', value: 1 }],
    from: { key_code: fromKeyCode, modifiers: { optional: ['caps_lock'] } },
    to: to,
  }
}

function tabModeHyperKey(keyCode, modifiers) {
  return tabModeKey(keyCode, [{ key_code: keyCode, modifiers: modifiers || HYPER }])
}

//
// MouseCursor Mode [D as Trigger Key] helper
//
function mouseCursorKey(fromKeyCode, to, modifiers) {
  return {
    type: 'basic',
    from: { key_code: fromKeyCode, modifiers: modifiers || { optional: ['any'] } },
    to: [to],
    conditions: [{ type: 'variable_if', name: 'mousecursor_mode', value: 1 }],
  }
}

//
// Number Row Modifiers / Home Row Modifiers helper
//
function tapHold(fromKeyCode, holdKeyCode) {
  return {
    type: 'basic',
    from: { key_code: fromKeyCode, modifiers: { optional: ['any'] } },
    to_if_alone: [{ key_code: fromKeyCode }],
    to_if_held_down: [{ key_code: holdKeyCode }],
    parameters: {
      'basic.to_if_alone_timeout_milliseconds': 300,
      'basic.to_if_held_down_threshold_milliseconds': 0,
    },
  }
}

main()
