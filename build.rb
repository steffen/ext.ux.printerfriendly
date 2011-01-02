class Build
  @plugin_name = "ext.ux.printerfriendly"
  
  @js_files = [
    'core/Ext.js',
    'core/EventManager.js',
    'util/CSS.js',
    'grid/PrinterGridPanel.js',
    'grid/PrinterGridView.js',
    'grid/PrinterGroupingView.js',
    'PrinterWindow.js',
    'Shortcuts.js',
    'init_css.js'
  ]
  
  @js_paths = @js_files.map { |file| "source/#{file}" };
  
  @debug_file = "build/#{@plugin_name}-debug.js";
  @minified_file = "build/#{@plugin_name}.js";
  
  def self.run
    build_debug_file
    build_minified_file
  end
  
  def self.build_debug_file
    system "rm #{@debug_file}"
    system "cat #{@js_paths.join(' ')} >> #{@debug_file}"
    puts "Built #{@debug_file}";
  end
  
  def self.build_minified_file
    build_debug_file
    
    system "java -jar ../yuicompressor.jar -o #{@minified_file} #{@debug_file}"
    puts "Built #{@minified_file}";
  end
end

Build.run