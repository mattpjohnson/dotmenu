var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "./CommandGroup"], function (require, exports, CommandGroup_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RecentCommandGroup = /** @class */ (function (_super) {
        __extends(RecentCommandGroup, _super);
        function RecentCommandGroup() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RecentCommandGroup;
    }(CommandGroup_1.CommandGroup));
    exports.RecentCommandGroup = RecentCommandGroup;
});
