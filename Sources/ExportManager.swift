import Foundation

/// A manager to handle the exporting of animations.
class ExportManager {
    
    /// Exports an animation to a specified file path.
    ///
    /// - Parameters:
    ///   - animationData: The data representing the animation.
    ///   - filePath: The file path where the animation will be saved.
    func export(animationData: Data, to filePath: String) throws {
        let fileURL = URL(fileURLWithPath: filePath)
        
        do {
            try animationData.write(to: fileURL)
            print("Animation exported successfully to \(filePath)")
        } catch {
            throw ExportError.exportFailed
        }
    }

    enum ExportError: Error {
        case exportFailed
    }
}